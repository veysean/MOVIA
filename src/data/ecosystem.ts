/**
 * Ecosystem & recognition (handover §7).
 * type: 'partner'    = formal, agreed, approved for public representation
 *       'program'    = accelerator / innovation program / award
 *       'engagement' = interviews, consultations, exploratory or technical talks
 * RULES: never list an organization as 'partner' because of a conversation.
 * `logo` only when `logoApproved: true`. Unconfirmed items show a "To confirm" tag.
 */
export type EcoItem = {
  id: string;
  type: 'partner' | 'program' | 'engagement';
  confirmed: boolean;
  name: { en: string; km: string };
  detail: { en: string; km: string };
  date: string;
  logo: string;
  logoApproved: boolean;
};

export const ecosystem: EcoItem[] = [
  { id: 'dgiy', type: 'program', confirmed: false, name: { en: 'DGIy Demo Day 2026', km: 'DGIy Demo Day 2026' }, detail: { en: '[TO CONFIRM] Exact recognition / award wording.', km: '[ត្រូវបញ្ជាក់] ពាក្យពេចន៍ការទទួលស្គាល់ ឬពានរង្វាន់ពិតប្រាកដ។' }, date: '2026', logo: '', logoApproved: false },
  { id: 'greenhouse', type: 'program', confirmed: false, name: { en: 'GreenHouse', km: 'GreenHouse' }, detail: { en: '[TO CONFIRM] Program name and participation status.', km: '[ត្រូវបញ្ជាក់] ឈ្មោះកម្មវិធី និងស្ថានភាពនៃការចូលរួម។' }, date: '[date]', logo: '', logoApproved: false },
  { id: 'tsinghua', type: 'program', confirmed: false, name: { en: 'Tsinghua Global SDG Case Competition', km: 'Tsinghua Global SDG Case Competition' }, detail: { en: '[TO CONFIRM] Where the MOVIA team first formed — confirm wording and result.', km: '[ត្រូវបញ្ជាក់] កន្លែងដែលក្រុម MOVIA បានបង្កើតឡើងដំបូង។' }, date: '[date]', logo: '', logoApproved: false },
  { id: 'drivers', type: 'engagement', confirmed: false, name: { en: 'EV driver discovery', km: 'ការស្វែងយល់ពីអ្នកបើកបរ' }, detail: { en: 'Interviews with EV drivers about charging and journeys.', km: 'ការសម្ភាសន៍អ្នកបើកបរអំពីការសាកថ្ម និងដំណើរ។' }, date: '2026', logo: '', logoApproved: false },
  { id: 'cpos', type: 'engagement', confirmed: false, name: { en: 'Charging operator discovery', km: 'ការស្វែងយល់ពីប្រតិបត្តិករ' }, detail: { en: 'Exploratory conversations with charging point operators.', km: 'កិច្ចសន្ទនាស្វែងយល់ជាមួយប្រតិបត្តិករស្ថានីយសាកថ្ម។' }, date: '2026', logo: '', logoApproved: false },
  { id: 'api', type: 'engagement', confirmed: false, name: { en: 'Technical / API exploration', km: 'ការស្វែងយល់បច្ចេកទេស / API' }, detail: { en: 'Investigating data and interoperability options. Not a partnership.', km: 'ការស៊ើបអង្កេតជម្រើសទិន្នន័យ និងអន្តរប្រតិបត្តិការ។ មិនមែនភាពជាដៃគូទេ។' }, date: '2026', logo: '', logoApproved: false },
];
