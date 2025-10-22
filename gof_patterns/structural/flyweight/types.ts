export enum ShippingMethod {
  Standard = 0,
  OneDay = 1,
  TwoDay = 2,
  Freight = 3,
}

export enum TaxRegion {
  US = 0,
  CA = 1,
  OC = 2,
}

export type OrderJSON = {
  orderId: number;
  user: string;
  shippingMethodId: ShippingMethod;
  taxRegionId: TaxRegion;
  heavyMeta: string;
};
