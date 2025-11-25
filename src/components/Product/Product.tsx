import type { Product as ProductType } from "@/lib/types";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  loading?: boolean;
  product?: ProductType;
};

function Product({ loading, product }: Props) {
  // Return skeleton
  if (!product || loading)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="lg:col-span-2 flex flex-col gap-2">
          <Skeleton className="h-6 w-full rounded-sm" />
          <Skeleton className="h-5 w-full rounded-sm" />
          <Skeleton className="h-4 w-full rounded-sm" />
          <Skeleton className="h-12 w-full rounded-sm" />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <figure className="aspect-square bg-gray-100 rounded-2xl">
        <img
          className="rounded-2xl aspect-square object-contain object-center"
          src={product.image}
          alt="product"
        />
      </figure>
      <div className="lg:col-span-2 flex flex-col">
        <h4 className="font-sans font-bold text-base text-gray-900">
          {product.name}
        </h4>
        <h5 className="font-sans font-semibold text-sm text-gray-500">
          {product.currency}
          {product.price}
        </h5>
        <small className="font-sans font-regular text-xs text-gray-500 mb-1">
          {product.brand} | <span className="text-gray-400">{product.sku}</span>
        </small>
        <p className="font-sans font-regular leading-4 text-xs text-gray-900 h-12 line-clamp-3">
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default Product;
