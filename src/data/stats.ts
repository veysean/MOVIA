/**
 * Public market figures for the Home "The insight" section.
 * RULE: every stat needs a value, a dated context line and a public source link.
 * These are third-party figures about Cambodia's EV market — never MOVIA results.
 * Khmer strings are DRAFT KM — pending review by a native Khmer speaker on the team.
 */
export type Stat = {
  id: string;
  value: string;
  label: { en: string; km: string };
  context: { en: string; km: string };
  source: { name: { en: string; km: string }; url: string };
};

// 234 and 421 come from the same Cambodia Nation article, which cites the Electricity Authority of Cambodia
const cambodiaNationEac = {
  en: 'Cambodia Nation, citing Electricity Authority of Cambodia',
  km: 'Cambodia Nation ដោយដកស្រង់ពីអាជ្ញាធរអគ្គិសនីកម្ពុជា', // DRAFT KM
};
const cambodiaNation =
  'https://cambodianation.com/authorized-electric-vehicle-charging-stations-in-cambodia-reach-234-stations-as-of-september-2026/';

export const stats: Stat[] = [
  {
    id: 'evs',
    value: '22,793',
    label: { en: 'Registered EVs', km: 'យានយន្តអគ្គិសនីដែលបានចុះបញ្ជី' }, // DRAFT KM
    context: {
      en: 'As of August 2026; reported 17 September 2026',
      km: 'គិតត្រឹមខែសីហា ឆ្នាំ២០២៦ · រាយការណ៍ថ្ងៃទី១៧ ខែកញ្ញា ឆ្នាំ២០២៦', // DRAFT KM
    },
    source: { name: { en: 'Kampuchea Thmey Daily', km: 'កាសែតកម្ពុជាថ្មី' }, url: 'https://en.kampucheathmey.com/economy/1148009/' }, // DRAFT KM
  },
  {
    id: 'stations',
    value: '234',
    label: { en: 'Authorized charging stations', km: 'ស្ថានីយសាកថ្មដែលមានការអនុញ្ញាត' }, // DRAFT KM
    context: { en: 'As of September 2026', km: 'គិតត្រឹមខែកញ្ញា ឆ្នាំ២០២៦' }, // DRAFT KM
    source: { name: cambodiaNationEac, url: cambodiaNation },
  },
  {
    id: 'outlets',
    value: '421',
    label: { en: 'Charging outlets / plugs', km: 'ចំណុចសាក / ក្បាលសាក' }, // DRAFT KM
    context: {
      en: 'Across 234 authorized stations, as of September 2026',
      km: 'នៅទូទាំងស្ថានីយដែលមានការអនុញ្ញាតចំនួន ២៣៤ គិតត្រឹមខែកញ្ញា ឆ្នាំ២០២៦', // DRAFT KM
    },
    source: { name: cambodiaNationEac, url: cambodiaNation },
  },
  {
    id: 'funding',
    value: '$10M',
    label: { en: 'Initial infrastructure funding commitment', km: 'ការប្តេជ្ញាផ្តល់មូលនិធិហេដ្ឋារចនាសម្ព័ន្ធដំបូង' }, // DRAFT KM
    context: {
      en: 'Government EV infrastructure initiative, announced May 2026',
      km: 'គំនិតផ្តួចផ្តើមហេដ្ឋារចនាសម្ព័ន្ធយានយន្តអគ្គិសនីរបស់រដ្ឋាភិបាល ប្រកាសក្នុងខែឧសភា ឆ្នាំ២០២៦', // DRAFT KM
    },
    source: { name: { en: 'Agence Kampuchea Presse', km: 'ទីភ្នាក់ងារសារព័ត៌មានកម្ពុជា (AKP)' }, url: 'https://akp.gov.kh/index.php/post/detail/371019' }, // DRAFT KM
  },
];
