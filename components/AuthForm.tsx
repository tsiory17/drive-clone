"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { createAccount } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });
type FormType = "sign-in" | "sign-up";
const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().min(2).max(50).optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);
  // 1. Define your form.
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try {
      const user = await createAccount({
        fullName: values.fullName || "",
        email: values.email,
      });

      setAccountId(user.accountId);
      console.log(values);
    } catch (e) {
      setErrorMessage("Failed to create account Please try again");
    } finally {
      setIsLoading(false);
      setErrorMessage("");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign-In" : "Sign-Up"}
          </h1>
          {type === "sign-up" && (
            // USERNAME
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="shad-input"
                        placeholder="Enter your Full Name"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          {/* END OF CONDITIONAL */}

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="shad-input"
                      placeholder="Enter your Email"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {type === "sign-up" ? "Sign up" : "Sign in"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                width={20}
                height={20}
                alt="loading"
              />
            )}
          </Button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="flex justify-center">
            <p>
              {type === "sign-up"
                ? "Doesn't have an account"
                : "Already Have an account?"}
            </p>
            <Link
              href={type === "sign-up" ? "/sign-in" : "/sign-up"}
              className="ml-2 flex font-medium text-orange"
            >
              {" "}
              {type === "sign-up" ? "Sign in" : "Sign Up"}
            </Link>
          </div>
        </form>
      </Form>

      {/* OTP VERIFICATION */}
      {accountId && (
        <OTPModal email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};
export default AuthForm;
