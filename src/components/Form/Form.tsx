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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { US_STATES } from "@/lib/constants";
import { Spinner } from "../ui/spinner";

const formSchema = z.object({
  url: z.httpUrl(),
  state: z.enum(US_STATES, "The State must be a valid US State"),
});

type Props = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  loading: boolean;
  hasProduct?: boolean;
  reset?: () => void;
};

function Form({ loading, hasProduct, onSubmit, reset }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      state: "",
    },
  });

  const handleReset = () => {
    form.reset();
    reset && reset();
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Luxyclip</CardTitle>
        <CardDescription>Get the product details from any URL.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-url">URL</FieldLabel>
                  <Input
                    {...field}
                    id="form-url"
                    aria-invalid={fieldState.invalid}
                    placeholder="https://www.example.org/my-awesome-product"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-description">US State</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-select-state"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Choose US State" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {US_STATES.map((state) => (
                        <SelectItem
                          key={state.toLowerCase()}
                          value={state.toUpperCase()}
                        >
                          {state.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </Button>
          <Button type="submit" form="form" disabled={loading}>
            {loading && <Spinner />}
            {hasProduct ? "Open Details" : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

export default Form;
