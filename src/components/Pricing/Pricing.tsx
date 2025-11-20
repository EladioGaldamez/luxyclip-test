import type { Pricing as PricingType } from "./types";

type Props = {
  pricing: PricingType;
};

function Pricing({ pricing }: Props) {
  const {
    price,
    finalPrice,
    fees: { shippingFee, merchantTax, surcharge, surchargeTax },
  } = pricing;

  return (
    <div className="pricing-info">
      <table>
        <tbody>
          <tr>
            <td>Product Price:</td>
            <td>${price}</td>
          </tr>
          <tr>
            <td>Shipping:</td>
            <td>${shippingFee}</td>
          </tr>
          <tr>
            <td>Tax:</td>
            <td>${merchantTax}</td>
          </tr>
          <tr>
            <td>Service Fee:</td>
            <td>${surcharge}</td>
          </tr>
          <tr>
            <td>Service Fee Tax:</td>
            <td>${surchargeTax}</td>
          </tr>
          <tr>
            <td>Total:</td>
            <td>${finalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Pricing;
