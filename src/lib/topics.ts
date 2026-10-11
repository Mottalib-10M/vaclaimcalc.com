/** Menu groups of the site. Every page file names its group; menus, footer and breadcrumbs read them. */
export type Group = 'va' | 'pay' | 'bah' | 'retire' | 'edu';
export interface GroupInfo { id: Group; label: string; short: string }
export const GROUPS: GroupInfo[] = [
  { id: 'va', label: 'VA disability compensation', short: 'VA disability' },
  { id: 'pay', label: 'Military pay 2026', short: 'Pay' },
  { id: 'bah', label: 'Housing allowance (BAH)', short: 'BAH' },
  { id: 'retire', label: 'Military retirement', short: 'Retirement' },
  { id: 'edu', label: 'GI Bill and TSP', short: 'GI Bill & TSP' },
];
export const groupInfo = (id: Group): GroupInfo => GROUPS.find((g) => g.id === id)!;
