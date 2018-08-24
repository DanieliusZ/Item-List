export interface Demand {
  Date?: string;
  Buyer?: string;
  Item: string;
  Responded: boolean;
  Supplier?: string;
  OrderDate?: string;
  TrackingNumber?: string;
  Notes?: string;
  key?: string;
  OverdueDuration?: number;
  IsArchived?: boolean;
}
