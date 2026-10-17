/**
 * Team profiles (handover §5.3).
 * RULE: set `confirmed: true` ONLY after the member has reviewed and approved
 * their card in writing. Unconfirmed cards still show the real name, role and
 * photo, but replace the bio with the "pending review" text, carry a "To confirm"
 * tag, and NEVER render email or LinkedIn links.
 * `photo`: put a square image in /public/img/team/ (e.g. '/img/team/name.jpg') or leave '' for initials.
 * Khmer names use the English spelling until each member supplies a Khmer spelling.
 */
export type Member = {
  id: string;
  confirmed: boolean;
  name: { en: string; km: string };
  role: { en: string; km: string };
  bio: { en: string; km: string };
  photo: string;
  linkedin: string;
  email: string; // only if the person agrees
};

const placeholderBio = {
  en: '[TO CONFIRM] Short bio, 1–3 sentences, written or approved by this member.',
  km: '[ត្រូវបញ្ជាក់] ប្រវត្តិរូបខ្លី ១–៣ ប្រយោគ សរសេរ ឬអនុម័តដោយសមាជិកនេះ។',
};

export const team: Member[] = [
  {
    id: 'sovannita-yim', confirmed: false,
    name: { en: 'Sovannita Yim', km: 'Sovannita Yim' },
    role: { en: 'Project Lead — Strategy, Policy & System', km: 'ប្រធានគម្រោង — យុទ្ធសាស្ត្រ គោលនយោបាយ និងប្រព័ន្ធ' },
    bio: placeholderBio, photo: '', linkedin: '', email: '',
  },
  {
    id: 'veysean-kem', confirmed: false,
    name: { en: 'Veysean Kem', km: 'Veysean Kem' },
    role: { en: 'Product & Technology Lead', km: 'ប្រធានផ្នែកផលិតផល និងបច្ចេកវិទ្យា' },
    bio: placeholderBio, photo: '/img/team/veysean-kem.jpg', linkedin: '', email: '',
  },
  {
    id: 'kheankeo-babera', confirmed: false,
    name: { en: 'Kheankeo Babera', km: 'Kheankeo Babera' },
    role: { en: 'Intelligence & Infrastructure Lead', km: 'ប្រធានផ្នែកបញ្ញា និងហេដ្ឋារចនាសម្ព័ន្ធ' },
    bio: placeholderBio, photo: '', linkedin: '', email: '',
  },
  {
    id: 'sokunmealea-soy', confirmed: false,
    name: { en: 'Sokunmealea Soy', km: 'Sokunmealea Soy' },
    role: { en: 'Strategic Partnerships, Sales & Marketing Lead', km: 'ប្រធានផ្នែកភាពជាដៃគូយុទ្ធសាស្ត្រ ការលក់ និងទីផ្សារ' },
    bio: placeholderBio, photo: '', linkedin: '', email: '',
  },
  {
    id: 'noucheav-phorn', confirmed: false,
    name: { en: 'Noucheav Phorn', km: 'Noucheav Phorn' },
    role: { en: 'Media & Communications Lead', km: 'ប្រធានផ្នែកប្រព័ន្ធផ្សព្វផ្សាយ និងទំនាក់ទំនង' },
    bio: placeholderBio, photo: '', linkedin: '', email: '',
  },
];
