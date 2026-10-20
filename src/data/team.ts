/**
 * Team profiles: About › "Meet our team, EnergyFlow" (handover §5.3).
 * RULE: set `confirmed: true` ONLY after the member has reviewed and approved
 * their card in writing. Unconfirmed cards still show the real name, role and
 * photo, but replace the bio with the "pending review" text, carry a "To confirm"
 * tag, and NEVER render email or LinkedIn links.
 * `photo`: a small square image in /public/img/team/ (144×144 JPG, ~5 KB) or '' for initials.
 *   Keep full-size originals in /originals/team/ (git-ignored), never in public/.
 * `study`: "Major · School · Year N" (school names stay in Latin letters in Khmer too). Majors in the team are Digital Business, Computer Science and
 *   Industrial Engineering; schools are CADT and Paragon IU. Never guess who studies what:
 *   keep the placeholder until the member confirms. Placeholders (text starting
 *   with "[") are never printed: the card shows a "To confirm" tag (study) or nothing (bio).
 * Khmer strings marked DRAFT KM need review by a native speaker.
 */
export type Member = {
  id: string;
  confirmed: boolean;
  name: { en: string; km: string };
  role: { en: string; km: string };
  study: { en: string; km: string };
  bio: { en: string; km: string };
  photo: string;
  linkedin: string;
  email: string; // only if the person agrees
};

/** true when the text is empty or still a bracketed placeholder ("[…] …") */
export const isPlaceholder = (s: string) => !s.trim() || s.trim().startsWith('[');

const placeholderBio = {
  en: '[TO CONFIRM] Short bio, 1–3 sentences, written or approved by this member.',
  km: '[ត្រូវបញ្ជាក់] ប្រវត្តិរូបខ្លី ១–៣ ប្រយោគ សរសេរ ឬអនុម័តដោយសមាជិកនេះ។', // DRAFT KM
};

export const team: Member[] = [
  {
    id: 'sovannita-yim', confirmed: true,
    name: { en: 'Sovannita Yim', km: 'យឹម សុវណ្ណនីតា' }, // DRAFT KM
    role: { en: 'Project Lead — Strategy, Policy & System', km: 'ប្រធានគម្រោង — យុទ្ធសាស្ត្រ គោលនយោបាយ និងប្រព័ន្ធ' }, // DRAFT KM
    study: {
      en: 'Digital Business · CADT · Year 4',
      km: 'ពាណិជ្ជកម្មឌីជីថល · CADT · ឆ្នាំទី៤', // DRAFT KM
    },
    bio: placeholderBio, photo: '/img/team/sovannita-yim.jpg', linkedin: '', email: '',
  },
  {
    id: 'veysean-kem', confirmed: true,
    name: { en: 'Veysean Kem', km: 'កែម វៃស៊ាន' }, // DRAFT KM
    role: { en: 'Product & Technology Lead', km: 'ប្រធានផ្នែកផលិតផល និងបច្ចេកវិទ្យា' }, // DRAFT KM
    study: {
      en: 'Computer Science · CADT · Year 4',
      km: 'វិទ្យាសាស្ត្រកុំព្យូទ័រ · CADT · ឆ្នាំទី៤', // DRAFT KM
    },
    bio: placeholderBio, photo: '/img/team/veysean-kem.jpg', linkedin: '', email: '',
  },
  {
    id: 'kheankeo-babera', confirmed: true,
    name: { en: 'Kheankeo Babera', km: 'ឃានកែវ បាបឺរ៉ា' }, // DRAFT KM
    role: { en: 'Intelligence & Infrastructure Lead', km: 'ប្រធានផ្នែកបញ្ញា និងហេដ្ឋារចនាសម្ព័ន្ធ' }, // DRAFT KM
    study: {
      en: 'Industrial Engineering · Paragon IU · Year 4',
      km: 'វិស្វកម្មឧស្សាហកម្ម · Paragon IU · ឆ្នាំទី៤', // DRAFT KM
    },
    bio: placeholderBio, photo: '/img/team/kheankeo-babera.jpg', linkedin: '', email: '',
  },
  {
    id: 'sokunmealea-soy', confirmed: true,
    name: { en: 'Sokunmealea Soy', km: 'សយ សុគន្ធមាលា' }, // DRAFT KM
    role: { en: 'Strategic Partnerships, Sales & Marketing Lead', km: 'ប្រធានផ្នែកភាពជាដៃគូយុទ្ធសាស្ត្រ ការលក់ និងទីផ្សារ' }, // DRAFT KM
    study: {
      en: 'Digital Business · CADT · Year 4',
      km: 'ពាណិជ្ជកម្មឌីជីថល · CADT · ឆ្នាំទី៤', // DRAFT KM
    },
    bio: placeholderBio, photo: '/img/team/sokunmealea-soy.jpg', linkedin: '', email: '',
  },
  {
    id: 'noucheav-phorn', confirmed: true,
    name: { en: 'Noucheav Phorn', km: 'ផន នូជៀវ' }, // DRAFT KM
    role: { en: 'Media & Communications Lead', km: 'ប្រធានផ្នែកប្រព័ន្ធផ្សព្វផ្សាយ និងទំនាក់ទំនង' }, // DRAFT KM
    study: {
      en: 'Digital Business · CADT · Year 4',
      km: 'ពាណិជ្ជកម្មឌីជីថល · CADT · ឆ្នាំទី៤', // DRAFT KM
    },
    bio: placeholderBio, photo: '/img/team/noucheav-phorn.jpg', linkedin: '', email: '',
  },
];
