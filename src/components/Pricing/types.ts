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
