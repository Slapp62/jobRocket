// Industries for business profiles (matches backend validation)
export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Construction',
  'Transportation',
  'Hospitality',
  'Real Estate',
  'Media',
  'Telecommunications',
  'Energy',
  'Agriculture',
  'Professional Services',
  'Government',
  'Non-Profit',
  'Other',
] as const;

export type Industry = (typeof INDUSTRIES)[number];
