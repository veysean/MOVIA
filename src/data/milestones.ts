/**
 * About › "Our learning journey": the milestone road.
 * Facts come from the team's CODE-C doc; edit wording here only with the team's OK
 * (DGIy / CADT wording still needs written permission — see check:content).
 *
 * `end` (YYYY-MM-DD): a milestone counts as reached only after this date, so it is drawn as
 * "upcoming" (dashed road, muted pin, "Next" tag) until then. The site is static, so the
 * state is decided at BUILD time: redeploy after the date for it to switch.
 * Leave `end` empty for a milestone with no date yet (always upcoming).
 *
 * `photos`: the first one is the milestone thumbnail; all of them open in the lightbox.
 *   Files live in /public/img/milestones/ as <id>.jpg + <id>.webp (extras <id>-2, <id>-3 …),
 *   made from the originals in /assets/ (git-ignored): max 1200 px wide, WebP q78 + JPG q80,
 *   metadata stripped, each < 250 KB. `src` is the .jpg; the .webp next to it is used first.
 *   Alt text: describe what is visible; never name people unless the name is visible.
 */
export type MilestonePhoto = {
  src: string;
  width: number;
  height: number;
  alt: { en: string; km: string };
};

export type Milestone = {
  id: string;
  end: string;
  date: { en: string; km: string }; // shown as written; '' = no date line
  title: { en: string; km: string };
  text: { en: string; km: string };
  photos: MilestonePhoto[];
};

// [TO CONFIRM] written OK from DGIy (milestones 1–2) and CADT (milestone 3) to publish this wording
export const milestones: Milestone[] = [
  {
    id: 'concept', end: '2026-08-16',
    date: { en: 'Aug 15–16, 2026', km: '១៥–១៦ សីហា ២០២៦' }, // DRAFT KM
    title: { en: 'From Problem to Concept', km: 'ពីបញ្ហា ទៅជាគំនិត' }, // DRAFT KM
    text: { en: 'Top 6 teams advanced to the DGIy masterclass', km: 'ក្រុមកំពូលទាំង ៦ បានឡើងទៅវគ្គ DGIy masterclass' }, // DRAFT KM
    photos: [
      {
        src: '/img/milestones/concept.jpg', width: 1200, height: 675,
        alt: {
          en: 'Four MOVIA team members smiling on stage at the DGIy masterclass, one holding up a phone showing another person on screen',
          km: 'សមាជិកក្រុម MOVIA បួននាក់ញញឹមនៅលើឆាក ក្នុងវគ្គ DGIy masterclass ម្នាក់លើកទូរស័ព្ទបង្ហាញមនុស្សម្នាក់ទៀតនៅលើអេក្រង់', // DRAFT KM
        },
      },
      {
        src: '/img/milestones/concept-2.jpg', width: 1280, height: 720,
        alt: {
          en: 'Participants sitting on the floor and laughing while building a paper tower during a team activity at the DGIy masterclass',
          km: 'អ្នកចូលរួមអង្គុយលើឥដ្ឋ សើចសប្បាយ ពេលកំពុងសាងសង់ប៉មក្រដាស ក្នុងសកម្មភាពក្រុមនៅវគ្គ DGIy masterclass', // DRAFT KM
        },
      },
    ],
  },
  {
    id: 'demoday', end: '2026-10-03',
    date: { en: 'Oct 3, 2026', km: '៣ តុលា ២០២៦' }, // DRAFT KM
    title: { en: 'Recognition at DGIy Demo Day', km: 'ការទទួលស្គាល់នៅ DGIy Demo Day' }, // DRAFT KM
    text: { en: 'Top Winning Team', km: 'ក្រុមឈ្នះកំពូល' }, // DRAFT KM
    photos: [
      {
        src: '/img/milestones/demoday.jpg', width: 1200, height: 900,
        alt: {
          en: 'Five MOVIA team members on the DGIy Demo Day stage, one raising a trophy, holding a Top Winning Team board for the Regional Innovation Exchange Program to Indonesia',
          km: 'សមាជិកក្រុម MOVIA ប្រាំនាក់នៅលើឆាក DGIy Demo Day ម្នាក់លើកពានរង្វាន់ កាន់ផ្ទាំង Top Winning Team សម្រាប់កម្មវិធីផ្លាស់ប្តូរនវានុវត្តន៍ក្នុងតំបន់ទៅប្រទេសឥណ្ឌូនេស៊ី', // DRAFT KM
        },
      },
      {
        src: '/img/milestones/demoday-2.jpg', width: 1280, height: 853,
        alt: {
          en: 'Five MOVIA team members in dark suits standing beside the Team EnergyFlow MOVIA poster at DGIy Demo Day',
          km: 'សមាជិកក្រុម MOVIA ប្រាំនាក់ ស្លៀកពាក់អាវធំពណ៌ខ្មៅ ឈរក្បែរផ្ទាំងបដា Team EnergyFlow MOVIA នៅ DGIy Demo Day', // DRAFT KM
        },
      },
      {
        src: '/img/milestones/demoday-3.jpg', width: 1280, height: 853,
        alt: {
          en: 'Five MOVIA team members holding framed Certificates of Appreciation next to an event guest at DGIy Demo Day',
          km: 'សមាជិកក្រុម MOVIA ប្រាំនាក់កាន់លិខិតសរសើរដាក់ស៊ុម ឈរក្បែរភ្ញៀវកិត្តិយសនៅ DGIy Demo Day', // DRAFT KM
        },
      },
      {
        src: '/img/milestones/demoday-4.jpg', width: 960, height: 1280,
        alt: {
          en: 'Glass trophy reading Top Winning Team, DGIy Youth Cohort 2026, 03 October 2026, with EnergyFlow on its base',
          km: 'ពានរង្វាន់កញ្ចក់ដែលមានសរសេរថា Top Winning Team, DGIy Youth Cohort 2026, ថ្ងៃទី០៣ ខែតុលា ឆ្នាំ២០២៦ និងពាក្យ EnergyFlow នៅលើជើង', // DRAFT KM
        },
      },
    ],
  },
  {
    id: 'codec', end: '2026-10-22',
    date: { en: 'Oct 21–22, 2026', km: '២១–២២ តុលា ២០២៦' }, // DRAFT KM
    title: { en: 'CODE-C', km: 'CODE-C' },
    text: { en: 'Exhibition showcase at CADT’s Innovation Center', km: 'ការតាំងពិព័រណ៍នៅមជ្ឈមណ្ឌលនវានុវត្តន៍ CADT' }, // DRAFT KM
    photos: [],
  },
  {
    id: 'regional', end: '',
    date: { en: '', km: '' },
    title: { en: 'Regional learning: Indonesia', km: 'ការសិក្សាក្នុងតំបន់៖ ឥណ្ឌូនេស៊ី' }, // DRAFT KM
    text: { en: 'Exploring beyond Cambodia', km: 'ស្វែងយល់ហួសពីកម្ពុជា' }, // DRAFT KM
    photos: [],
  },
];

/** reached = its end date is before the build date (Asia/Phnom_Penh, UTC+7) */
export const isReached = (m: Milestone, now = new Date()) => {
  if (!m.end) return false;
  const endOfDay = new Date(`${m.end}T23:59:59+07:00`);
  return now > endOfDay;
};
