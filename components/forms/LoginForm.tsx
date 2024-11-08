"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { LoginFormValidation } from "@/lib/validation";
import { loginUser } from "@/lib/actions/patient.actions";
import { useRouter, useSearchParams } from "next/navigation";
import { FormFieldType } from "./SignupForm";
import PassKeyModal from "../PassKeyModal";
import { encryptKey } from "@/lib/utils";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    email,
    password,
  }: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { email, password };
      const res = await loginUser(userData);

      if (res.status) {
        if (res.status == 200) {
          const user: {
            id: string;
            fullname: string;
            role: string;
            email: string;
            phone: string;
          } = {
            id: res.data.userId,
            fullname: res.data.fullname,
            role: res.data.role,
            email: res.data.email,
            phone: res.data.phone,
          };
          localStorage.setItem("token", JSON.stringify(res.accessToken));
          const encryptedUserData = encryptKey(JSON.stringify(user));
          localStorage.setItem("userData", encryptedUserData);

          if (user.role === "Admin") {
            setIsAdmin(true);
          } else if (user.role === "User") {
            router.push(from || "/dashboard");
          } else {
            router.push(from || `/dashboard`);
          }
        } else if (res.status == 401) {
          setError(res.response.data.message);
        } else {
          setError(res.message);
        }
      } else {
        setError("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  if (isAdmin) {
    return <PassKeyModal />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-6 mb-12">
          <h1 className="header">Hello there 👋</h1>
          <p className="text-dark-700">
            Login to get started with appointments
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email Address"
          placeholder="example@email.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PASSWORD}
          name="password"
          label="Password"
          placeholder="Your Password"
          iconSrc="/assets/icons/password.svg"
          iconAlt="password"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <SubmitButton isLoading={isLoading}>Login</SubmitButton>
        <p className="shad-error">{error && error}</p>
      </form>
    </Form>
  );
};

export default LoginForm;
