import type {
  Product as ProductType,
  Pricing as PricingType,
} from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product from "@/components/Product";
import Pricing from "@/components/Pricing";
import type { Dispatch, SetStateAction } from "react";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loading?: boolean;
  saving?: boolean;
  product?: ProductType;
  pricing?: PricingType;
  onSubmit?: () => void;
};

function ResultsDrawer({
  isOpen,
  setOpen,
  loading,
  saving,
  product,
  pricing,
  onSubmit,
}: Props) {
  return (
    <Drawer open={isOpen} onClose={() => setOpen(false)}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Results</DrawerTitle>
        </DrawerHeader>
        <Tabs className="mx-auto w-full max-w-sm h-96" defaultValue="product">
          <TabsList>
            <TabsTrigger value="product">Product</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
          </TabsList>
          <TabsContent value="product">
            <Product loading={loading} product={product} />
          </TabsContent>
          <TabsContent value="pricing">
            <Pricing loading={loading} pricing={pricing} />
          </TabsContent>
          <DrawerFooter>
            <Button disabled={!product || saving} onClick={onSubmit}>
              {saving && <Spinner />}
              Send to Shopify
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Close Details</Button>
            </DrawerClose>
          </DrawerFooter>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}

export default ResultsDrawer;
