/**
 * Verified proof points (handover §5.4).
 * RULE: only `confirmed: true` items are shown publicly. Every item needs a
 * value, a definition and an "as of" date. Unconfirmed items appear with a
 * "To confirm" tag so reviewers can see what is missing.
 */
export type Proof = {
  id: string;
  confirmed: boolean;
  value: string; // e.g. '24'
  label: { en: string; km: string };
  definition: { en: string; km: string };
  asOf: string; // e.g. 'Oct 2026'
};

export const proofPoints: Proof[] = [
  { id: 'interviews', confirmed: false, value: '—', label: { en: 'EV driver interviews completed', km: 'ការសម្ភាសន៍អ្នកបើកបរយានយន្តអគ្គិសនី' }, definition: { en: '[TO CONFIRM] Structured interviews with EV drivers in Cambodia.', km: '[ត្រូវបញ្ជាក់] ការសម្ភាសន៍ជាមួយអ្នកបើកបរយានយន្តអគ្គិសនីនៅកម្ពុជា។' }, asOf: '[date]' },
  { id: 'cpo', confirmed: false, value: '—', label: { en: 'Charging-operator conversations', km: 'កិច្ចសន្ទនាជាមួយប្រតិបត្តិករស្ថានីយសាកថ្ម' }, definition: { en: '[TO CONFIRM] Discovery conversations with charging point operators.', km: '[ត្រូវបញ្ជាក់] កិច្ចសន្ទនាស្វែងយល់ជាមួយប្រតិបត្តិករ។' }, asOf: '[date]' },
  { id: 'registrations', confirmed: false, value: '—', label: { en: 'Pilot-interest registrations', km: 'ការចុះឈ្មោះចាប់អារម្មណ៍កម្មវិធីសាកល្បង' }, definition: { en: '[TO CONFIRM] People who registered interest in future pilot testing.', km: '[ត្រូវបញ្ជាក់] អ្នកដែលបានចុះឈ្មោះចាប់អារម្មណ៍។' }, asOf: '[date]' },
  { id: 'prototypes', confirmed: false, value: '2', label: { en: 'Working prototypes', km: 'គំរូដើមដែលដំណើរការ' }, definition: { en: '[TO CONFIRM] Rider app and operator dashboard prototypes (not launched products).', km: '[ត្រូវបញ្ជាក់] គំរូដើមកម្មវិធីអ្នកបើកបរ និងផ្ទាំងគ្រប់គ្រងប្រតិបត្តិករ (មិនមែនផលិតផលដែលបានដាក់ឱ្យប្រើ)។' }, asOf: '[date]' },
];
