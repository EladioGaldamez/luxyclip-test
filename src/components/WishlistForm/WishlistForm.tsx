"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  wishlist: z.string(),
});

type Props = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

function WishlistForm({ onSubmit }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wishlist: "",
    },
  });

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Luxyclip</CardTitle>
        <CardDescription>
          Please fill your wishlist ID before continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="wishlist"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-Wishlist">Wishlist ID</FieldLabel>
                  <FieldDescription>
                    Type the ID of your wishlist (in shopify)
                  </FieldDescription>
                  <Input
                    {...field}
                    id="form-url"
                    aria-invalid={fieldState.invalid}
                    placeholder="gid://shopify/Metaobject/515107504 or 515107504"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form">
            Start
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

export default WishlistForm;
