import {
  type ChangeEventHandler,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Product as ProductType } from "./types";

type Props = {
  product: ProductType;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
};

function Product({ product, price, setPrice }: Props) {
  const onChangePrice: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPrice(event.target.valueAsNumber);
  };

  return (
    <div className="product-info">
      <div>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          id="name"
          value={product.name}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="brand"></label>
        <input
          type="text"
          name="brand"
          id="brand"
          value={product.brand}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="sku"></label>
        <input type="text" name="sku" id="sku" value={product.sku} readOnly />
      </div>
      <div>
        <label htmlFor="price"></label>
        <input
          type="number"
          name="price"
          id="price"
          onChange={onChangePrice}
          value={price}
        />
      </div>
      <div>
        <label htmlFor="currency"></label>
        <input
          type="text"
          name="currency"
          id="currency"
          value={product.currency}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="description"></label>
        <input
          type="text"
          name="description"
          id="description"
          value={product.description}
          readOnly
        />
      </div>
      {product.image && (
        <figure>
          <img src={product.image} alt="" width={320} />
        </figure>
      )}
    </div>
  );
}

export default Product;
