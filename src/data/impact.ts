/**
 * About › "Our Impact": the three headline figures + the EnergyFlow event photo grid.
 *
 * Figures: team-reported counts. Each needs a definition and an "as of" date before launch
 * (see check:content). Don't add a figure without a source the team can show.
 *
 * Photos: originals go in /assets/energyflow/ (git-ignored). Make a .jpg + .webp pair per photo in
 * /public/img/impact/ (max 1600 px wide, WebP q78 / JPG q80, metadata stripped, < 300 KB each,
 * with `sharp`) named energyflow-1, energyflow-2 … and rebuild. Every .jpg there appears
 * automatically, sorted by filename, with its .webp used first; give each one alt text + size
 * in `photoInfo` below. A photo missing from `photoInfo` is treated as decorative (alt="").
 * While the folder is empty, the grid shows "coming soon" placeholder slots of the same size.
 */
export type ImpactStat = {
  id: string;
  value: number;
  suffix: string; // e.g. '+'
  label: { en: string; km: string };
};

// [TO CONFIRM] for each figure: what exactly was counted and the "as of" date (keep it with the team's records)
export const impactStats: ImpactStat[] = [
  { id: 'outreach', value: 250, suffix: '+', label: { en: 'Engagement outreach', km: 'ការចុះផ្សព្វផ្សាយ និងការចូលរួម' } }, // DRAFT KM
  { id: 'sharing', value: 1, suffix: '', label: { en: 'Sharing initiative', km: 'គំនិតផ្តួចផ្តើមចែករំលែក' } }, // DRAFT KM
  { id: 'mvps', value: 2, suffix: '', label: { en: 'MVPs', km: 'MVP' } },
];

/** alt text (what is visible; never name people unless the name is visible) + pixel size per file */
export const photoInfo: Record<string, { width: number; height: number; alt: { en: string; km: string } }> = {
  'energyflow-1.jpg': {
    width: 1600, height: 1067,
    alt: {
      en: 'Group photo of the EnergyFlow audience filling the hall, with several participants in front holding certificates',
      km: 'រូបថតរួមរបស់អ្នកចូលរួមព្រឹត្តិការណ៍ EnergyFlow ពេញសាល ដោយមានអ្នកចូលរួមខ្លះនៅខាងមុខកាន់វិញ្ញាបនបត្រ', // DRAFT KM
    },
  },
  'energyflow-2.jpg': {
    width: 1600, height: 1067,
    alt: {
      en: 'Participants standing on stage holding tote bags in front of the EnergyFlow screen',
      km: 'អ្នកចូលរួមឈរនៅលើឆាក កាន់កាបូប នៅមុខអេក្រង់ EnergyFlow', // DRAFT KM
    },
  },
  'energyflow-3.jpg': {
    width: 1600, height: 1067,
    alt: {
      en: 'Four people on stage holding certificates in front of the EnergyFlow banner',
      km: 'មនុស្សបួននាក់នៅលើឆាក កាន់វិញ្ញាបនបត្រ នៅមុខផ្ទាំងបដា EnergyFlow', // DRAFT KM
    },
  },
};

export type EventPhoto = { file: string; src: string; webp: string | null; width: number; height: number; alt: { en: string; km: string } };

// only the .jpg files are listed; a .webp with the same name is used first when it exists
const jpgs = Object.keys(import.meta.glob('/public/img/impact/*.{jpg,jpeg,JPG,JPEG}')).sort();
const webps = new Set(Object.keys(import.meta.glob('/public/img/impact/*.webp')));

export const eventPhotos: EventPhoto[] = jpgs.map((path) => {
  const file = path.split('/').pop()!;
  const webp = path.replace(/\.jpe?g$/i, '.webp');
  const info = photoInfo[file];
  return {
    file,
    src: path.replace(/^\/public/, ''),
    webp: webps.has(webp) ? webp.replace(/^\/public/, '') : null,
    width: info?.width ?? 1600,
    height: info?.height ?? 1200,
    alt: info?.alt ?? { en: '', km: '' },
  };
});

/** placeholder slots shown while no photos have been added */
export const PHOTO_SLOTS = 6;
