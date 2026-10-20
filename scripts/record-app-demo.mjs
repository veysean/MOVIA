// Records a short looping demo of the rider-app prototype for the Home page phone mockup.
// Usage: npm run record:demo   (first time: npx playwright install chromium)
//
// demo/app.html is copied from the rider-app repo and is NEVER deployed: it is served from a
// throwaway local server here, and only the encoded video + poster land in public/video/.
// Needs network access: the prototype loads OSM map tiles and OSRM routes. A silent warm-up
// pass caches those responses first, so the recorded pass never shows tiles or routes loading.
import http from 'node:http';
import { readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import ffmpeg from 'ffmpeg-static';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const demoDir = path.join(root, 'demo');
const outDir = path.join(root, 'public', 'video');
const tmpDir = path.join(root, 'node_modules', '.cache', 'app-demo');
const VIEW = { width: 390, height: 844 };
const OUT_W = 540; // encoded width: the phone screen shows ~280 CSS px, so this is ~2x on retina
const DESTINATION = 'd4'; // Takeo Town: far enough that the trip needs a charging stop
const PAY_WITH = 'p1'; // ABA Pay (KHQR)
const TARGET_S = 20.5; // loop length

/* ---------- serve demo/ on a random local port ---------- */
const server = http.createServer(async (req, res) => {
  const file = path.join(demoDir, path.normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^([/\\])+/, ''));
  if (!file.startsWith(demoDir)) { res.writeHead(403); return res.end(); }
  try { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); res.end(await readFile(file)); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/app.html`;

/* ---------- shared cache for map tiles, routes and reverse geocoding ---------- */
const cache = new Map();
async function useCache(context) {
  await context.route(/^https:\/\/(.+\.)?(openstreetmap\.org|cartocdn\.com|project-osrm\.org)\//, async (route) => {
    const key = route.request().url();
    let hit = cache.get(key);
    if (!hit) {
      try {
        const res = await route.fetch();
        hit = { status: res.status(), headers: res.headers(), body: await res.body() };
        if (res.ok()) cache.set(key, hit);
      } catch { return route.abort(); }
    }
    await route.fulfill(hit);
  });
}

/* ---------- the golden path, using the app's own buttons ---------- */
async function flow(page, { record, capture }) {
  const t0 = Date.now();
  const sec = () => (Date.now() - t0) / 1000;
  const pause = (ms) => (record ? page.waitForTimeout(ms) : Promise.resolve());
  const idle = () => page.waitForFunction(() => document.getElementById('loading').hidden && document.getElementById('handoff').hidden, null, { timeout: 20000 });
  // every visible map has tiles and none are still loading (Leaflet adds .leaflet-tile-loaded on load
  // and on error), checked twice 300 ms apart so a map that is still zooming/fitting isn't counted early
  const tilesReady = () => page.waitForFunction(() => {
    const maps = [...document.querySelectorAll('#screen .leaflet-container')].filter((m) => m.offsetParent);
    return maps.every((m) => m.querySelector('.leaflet-tile-loaded') && !m.querySelector('.leaflet-tile:not(.leaflet-tile-loaded)'))
      && !document.querySelector('.leaflet-zoom-anim');
  }, null, { timeout: 8000, polling: 100 });
  const tiles = async () => {
    try { await tilesReady(); await page.waitForTimeout(300); await tilesReady(); }
    catch { console.warn('    ! map tiles still loading, continuing'); }
  };
  const screen = (id) => page.waitForFunction((s) => state.screen === s, id, { timeout: 20000 });
  const tap = (act, id) => page.locator(`#screen [data-act="${act}"]${id ? `[data-id="${id}"]` : ''}`).first().click();
  const log = [];
  const step = async (label, fn, dwell, { map = false } = {}) => {
    await fn(); await idle();
    if (map) await tiles();
    await page.waitForTimeout(200); // Leaflet tile fade-in / screen transition
    log.push(label);
    if (record) console.log(`  ${sec().toFixed(1).padStart(5)}s  ${label}`);
    await pause(dwell);
  };

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    // Demo pacing only (the prototype's own simulation settings): shorter fake network latency,
    // a quicker payment hand-off and a faster simulated charger, so the loop stays ~20 s.
    Object.assign(cfg, { latencyMs: 150, handoffMs: 650, handoffDoneMs: 450, chargeAccelSecPerTick: 420 });
    // Skip onboarding (not part of the demo): start on Home as a returning driver.
    go('home', { reset: true });
  });
  await idle(); await tiles(); await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  if (capture) await capture.start();
  const start = sec();

  await step('Home: battery + estimated range', async () => {}, 1300, { map: true });
  await step('Where to? (destination search)', () => tap('openDest'), 600, { map: true });
  await step('Destination picked: Takeo Town', () => tap('pickDest', DESTINATION), 1000, { map: true });
  await step('Reachability result', async () => { await tap('confirmDest'); await screen('reach'); }, 1300, { map: true });
  await step('Top charging stations', async () => { await tap('viewOptions'); await screen('options'); }, 1200, { map: true });
  await step('Station detail', async () => { await page.locator('#screen [data-act="pickStation"]').first().click(); await screen('detail'); }, 1000, { map: true });
  await step('Route to the station', async () => { await tap('navigateStation'); await screen('routing'); }, 600, { map: true });
  await step('Turn-by-turn navigation', async () => { await tap('startTrip'); await screen('live'); }, 800, { map: true });
  await step('Arrived at the station', async () => { await tap('arrived'); await screen('arrive'); }, 600);
  await step('Scan the charger', async () => { await tap('charge'); await screen('scan'); }, 500);
  await step('Charging session', async () => { await tap('startCharging'); await screen('charging'); }, 0);
  // charge until there is enough battery to reach the destination (the app checks this after payment)
  await page.waitForFunction(() => state.session && (state.session.complete || state.session.pct >= 55), null, { timeout: 30000 });
  await pause(400);
  await step('Pay with KHQR', async () => { await tap('stopPay'); await screen('payqr'); }, 800);
  await step('Choose how to pay', async () => { await tap('proceed'); await screen('confirm'); }, 500);
  await step('Paid, back on the route', async () => { await tap('payWith', PAY_WITH); await screen('routing'); }, 400, { map: true });
  await step('Navigating to Takeo', async () => { await tap('startTrip'); await screen('live'); }, 700, { map: true });
  await step('Arrival summary', async () => { await tap('arrived'); await screen('summary'); }, 1600);
  if (capture) await capture.stop();
  return { start, end: sec(), log };
}

/* ---------- 2x capture via Chrome's screencast ----------
   Playwright's recordVideo captures at CSS-pixel size (390 px wide) and ignores deviceScaleFactor,
   which leaves small app text soft. The CDP screencast sends real device-pixel frames (780 px)
   with timestamps; only changed frames arrive, so each frame's duration comes from the timestamps. */
async function screencast(page) {
  const cdp = await page.context().newCDPSession(page);
  const frames = []; const writes = [];
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    const file = path.join(tmpDir, `f${String(frames.length).padStart(5, '0')}.jpg`);
    frames.push({ file, t: metadata.timestamp });
    writes.push(writeFile(file, Buffer.from(data, 'base64')));
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  let stopAt = 0;
  return {
    frames,
    start: () => cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: VIEW.width * 2, maxHeight: VIEW.height * 2, everyNthFrame: 1 }),
    stop: async () => { stopAt = Date.now() / 1000; await cdp.send('Page.stopScreencast'); await Promise.all(writes); },
    // ffmpeg concat list: each frame shown until the next one arrived
    list: () => {
      const name = (f) => `file '${path.basename(f.file)}'`;
      const rows = frames.map((f, i) => `${name(f)}\nduration ${((frames[i + 1]?.t ?? stopAt) - f.t).toFixed(4)}`);
      return `${rows.join('\n')}\n${name(frames.at(-1))}\n`; // concat demuxer needs the last frame repeated
    },
  };
}

await rm(tmpDir, { recursive: true, force: true });
await mkdir(tmpDir, { recursive: true });
await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
const ctxOpts = { viewport: VIEW, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'no-preference' };

let rec, cap;
try {
  console.log('Warm-up pass (caching map tiles and routes)…');
  const warm = await browser.newContext(ctxOpts);
  await useCache(warm);
  await flow(await warm.newPage(), { record: false });
  await warm.close();
  console.log(`  cached ${cache.size} responses`);

  console.log('Recording…');
  const context = await browser.newContext(ctxOpts);
  await useCache(context);
  const page = await context.newPage();
  cap = await screencast(page);
  try { rec = await flow(page, { record: true, capture: cap }); }
  catch (e) { await page.screenshot({ path: path.join(tmpDir, '..', 'record-demo-error.png') }); console.error('Failed; screenshot in node_modules/.cache/record-demo-error.png'); throw e; }
  await context.close();
} finally {
  await browser.close();
  server.close();
}

/* ---------- encode: constant 30 fps, no audio ---------- */
const listFile = path.join(tmpDir, 'frames.txt');
await writeFile(listFile, cap.list());
const input = ['-f', 'concat', '-safe', '0', '-i', listFile];
// the live run varies with network/tile timing; a gentle speed-up (never > 1.3x) keeps the loop ~20 s
const dur = rec.end - rec.start;
const speed = Math.min(1.3, Math.max(1, dur / TARGET_S));
const vf = ['-vf', `setpts=PTS/${speed.toFixed(3)},fps=30,scale=${OUT_W}:-2:flags=lanczos`, '-an'];
const mp4 = path.join(outDir, 'app-demo.mp4');
const webm = path.join(outDir, 'app-demo.webm');
const poster = path.join(outDir, 'app-demo-poster.jpg');
console.log(`Encoding ${cap.frames.length} frames, ${dur.toFixed(1)} s at ${speed.toFixed(2)}x → ${(dur / speed).toFixed(1)} s…`);
await run(ffmpeg, ['-y', ...input, ...vf, '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4]);
await run(ffmpeg, ['-y', ...input, ...vf, '-c:v', 'libvpx-vp9', '-crf', '40', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', webm]);
await run(ffmpeg, ['-y', '-i', cap.frames[0].file, '-frames:v', '1', '-vf', `scale=${OUT_W}:-2:flags=lanczos`, '-q:v', '7', poster]);
await rm(tmpDir, { recursive: true, force: true });

for (const f of [mp4, webm, poster]) console.log(`  ${path.relative(root, f).padEnd(34)} ${((await stat(f)).size / 1024).toFixed(0)} KB`);
