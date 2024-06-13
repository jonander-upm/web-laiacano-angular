export type LcFilterType = keyof LcFilterData;
export interface LcFilterData {
  portfolioItemId?: string;
  title?: string;
  format?: string;
  status?: string;
}
