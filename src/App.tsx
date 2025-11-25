import {
  useEffect,
  // useEffect, useMemo,
  useState,
  type FormEventHandler,
} from "react";

import type {
  Product as ProductType,
  Pricing as PricingType,
} from "@/lib/types";

import { getProductInfoFromURL } from "@/lib/api";
import { toast } from "sonner";
import Form from "@/components/Form";
import ResultsDrawer from "@/components/Results";
import WishlistForm from "@/components/WishlistForm";
import { Spinner } from "@/components/ui/spinner";

function App() {
  const [product, setProduct] = useState<ProductType | undefined>();
  const [pricing, setPricing] = useState<PricingType>();
  const [wishlist, setWishlist] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const onSubmit = async (data: { url: string; state: string }) => {
    if (!loading) {
      if (!!product) {
        setOpen(true);
        return;
      }

      try {
        setLoading(true);
        setOpen(true);

        const { product, pricing } = await getProductInfoFromURL({
          url: data.url,
          state: data.state,
        });

        setProduct({ ...product, url: data.url });
        setPricing(pricing);

        toast.success("Product data retrieved successfully.");
      } catch (error: any) {
        toast.error("There was an error getting product info", {
          description: typeof error === "string" ? error : error?.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmitWishlist = (data: { wishlist: string }) => {
    setWishlist(data.wishlist);
    localStorage.setItem("wishlist_id", data.wishlist);
  };

  const handleReset = () => {
    setProduct(undefined);
    setPricing(undefined);
    setLoading(false);
    setSaving(false);
    setOpen(false);
  };

  const handleProductCreation = () => {
    if (saving) return;
    setSaving(true);

    if (!pricing || !product || !wishlist) return;

    const payload = {
      product: product,
      pricing,
      wishlist: {
        id: wishlist,
        preferences: "",
      },
    };

    fetch("https://jgaldamez.app.n8n.cloud/webhook/luxyclip/new-product", {
    // fetch("https://jgaldamez.app.n8n.cloud/webhook-test/luxyclip/new-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          toast.success("Product created.", {
            description: "The product was created and stored in your wishlist.",
          });
          return response.data;
        }

        throw new Error(response.error);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error saving to shopify.", {
          description: error?.message,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setSaving(false);
        }, 400);
      });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const wishlist = window.localStorage.getItem("wishlist_id");

      if (wishlist) {
        setWishlist(wishlist);
      }

      setInitialLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (initialLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      {wishlist ? (
        <Form
          hasProduct={!!product}
          loading={loading}
          onSubmit={onSubmit}
          reset={handleReset}
        />
      ) : (
        <WishlistForm onSubmit={onSubmitWishlist} />
      )}

      <ResultsDrawer
        onSubmit={handleProductCreation}
        isOpen={isOpen}
        setOpen={setOpen}
        loading={loading}
        product={product}
        pricing={pricing}
        saving={saving}
      />
    </>
  );
}

export default App;
