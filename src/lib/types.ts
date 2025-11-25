export type Product = {
  name: string;
  brand?: string;
  sku?: string;
  price?: number;
  currency?: string;
  image?: string;
  description?: string;
  url?: string;
};

export type Pricing = {
  price: number;
  finalPrice: number;
  fees: {
    shippingFee: number;
    merchantTax: number;
    surcharge: number;
    surchargeTax: number;
  };
};
