import { cn } from "@/lib/utils";
import type { Pricing as PricingType } from "./types";

import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  loading?: boolean;
  pricing?: PricingType;
};

function Pricing({ loading, pricing }: Props) {
  if (!pricing || loading)
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 10 }).map((_, idx) => (
          <Skeleton
            className={cn(idx % 2 === 0 ? "col-span-2" : "", "h-6")}
            key={idx}
          />
        ))}
        <Skeleton className="col-span-3 h-6" />
      </div>
    );

  const {
    price,
    finalPrice,
    fees: { shippingFee, merchantTax, surcharge, surchargeTax },
  } = pricing;

  const data = [
    { label: "Product Price", value: price },
    { label: "Shipping", value: shippingFee },
    { label: "Tax", value: merchantTax },
    { label: "Service Fee", value: surcharge },
    { label: "Service Fee Tax", value: surchargeTax },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {data.map((item) => (
        <Fragment key={item.label}>
          <span className="col-span-2">{item.label}:</span>
          <span className="text-right">${item.value}</span>
        </Fragment>
      ))}
      <div className="inline-grid grid-cols-3 col-span-3 gap-2 border-t border-gray-900">
        <span className="col-span-2">Total:</span>
        <span className="text-right">${finalPrice}</span>
      </div>
    </div>
  );
}

export default Pricing;
