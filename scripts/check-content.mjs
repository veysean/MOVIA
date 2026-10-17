// Lists everything still marked "To confirm" so the team knows what blocks launch.
// Usage: npm run check:content
import { readFileSync, readdirSync } from 'node:fs';
const files = ['src/data/site.ts', ...readdirSync('src/data').map((f) => `src/data/${f}`), 'src/i18n/en.ts', 'src/i18n/km.ts'];
let n = 0;
for (const f of [...new Set(files)]) {
  readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
    if (/confirmed:\s*false|emailConfirmed:\s*false|TO CONFIRM|ត្រូវបញ្ជាក់\]/.test(line)) {
      n++;
      console.log(`${f}:${i + 1}  ${line.trim().slice(0, 110)}`);
    }
  });
}
console.log(n ? `\n${n} item(s) still need confirmation before public launch.` : '\nAll content confirmed ✓');
