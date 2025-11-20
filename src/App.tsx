import {
  useEffect,
  useMemo,
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from "react";
import "./App.css";
import Product, { type Product as ProductType } from "./components/Product";
import Pricing, { type Pricing as PricingType } from "./components/Pricing";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [url, setUrl] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [product, setProduct] = useState<ProductType | undefined>();
  const [pricing, setPricing] = useState<PricingType>();
  const [price, setPrice] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const debouncedState = useDebounce(state, 500); // Debounce for 500ms
  const debouncedPrice = useDebounce(price, 500); // Debounce for 500ms

  const cleanUrl = useMemo(() => {
    if (!url) return null;

    let _url = url;

    if (!url.startsWith("http")) {
      _url = `https://${_url}`;
    }

    const cleanedUrl = new URL(_url);
    cleanedUrl.search = "";

    return cleanedUrl.toString();
  }, [url]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!loading) {
      setLoading(true);
      loadProductData();
    }
  };

  const handleProductCreation: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);

    if (!pricing || !product) return;

    const payload = {
      product: {
        ...product,
        url: cleanUrl,
      },
      pricing,
    };

    fetch("https://jgaldamez.app.n8n.cloud/webhook/luxyclip/new-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          return response.data;
        }

        throw new Error(response.error);
      })
      .then(() => {
        // setProduct(undefined);
        // setPricing(undefined);
        // setPrice(0);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setTimeout(() => {
          setSaving(false);
        }, 400);
      });
  };

  const onChangeUrl: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUrl(event.target.value);
  };

  const onChangeState: ChangeEventHandler<HTMLInputElement> = (event) => {
    setState(event.target.value);
  };

  const loadProductData = () => {
    fetch("https://jgaldamez.app.n8n.cloud/webhook/luxyclip/crawler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
        user_state: state,
        user_identifier: "234923042",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          return response.data?.body;
        }

        throw new Error(response.error);
      })
      .then((data) => {
        setProduct(data.product);
        setPricing(data.pricing);
        setPrice(data.pricing.price);
      })
      .catch((error) => {
        console.error(error);
        setProduct(undefined);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      });
  };

  const loadNewPricingData = () => {
    fetch("https://jgaldamez.app.n8n.cloud/webhook/luxyclip/calculate-fees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: state,
        price: price,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          return response.data;
        }

        throw new Error(response.error);
      })
      .then((data: PricingType) => {
        setPricing(data);
        // setPrice(data.price);
        return data;
      })
      .catch((error) => {
        console.error(error);
        setProduct(undefined);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    if (loading) return;

    setTimeout(() => {
      if (loading) return;

      if (debouncedState !== "" && debouncedPrice > 0) {
        setLoading(true);
        loadNewPricingData();
      }
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice, debouncedState]);

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(3,480px)`,
        gap: 48,
      }}
    >
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
          onSubmit={onSubmit}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              textAlign: "left",
            }}
          >
            <label htmlFor="url">URL</label>
            <input
              name="url"
              id="url"
              type="url"
              value={url}
              onChange={onChangeUrl}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              textAlign: "left",
            }}
          >
            <label htmlFor="url">State</label>
            <input
              name="state"
              id="state"
              type="string"
              value={state}
              onChange={onChangeState}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Getting Data..." : "Get Data"}
          </button>
        </form>

        {product && pricing && (
          <form style={{ marginTop: 96 }} onSubmit={handleProductCreation}>
            <button type="submit" disabled={saving}>
              {saving ? "Creating" : "Create"} the product
            </button>
          </form>
        )}
      </div>

      {pricing && <Pricing pricing={pricing} />}
      {product && (
        <Product product={product} price={price} setPrice={setPrice} />
      )}
    </section>
  );
}

export default App;
