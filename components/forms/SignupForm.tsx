"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  SELECT = "select",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
}

const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit({
    fullname,
    email,
    phone,
    password,
    confirmPassword,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { fullname, phone, email, password, confirmPassword };
      const user = await createUser(userData);

      if (user.status == 201) {
        router.push(`/patients/${user.data.userId}/register`);
      } else {
        setError(user.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="space-y-6 mb-8">
          <h1 className="header">Hello there 👋</h1>
          <p className="text-dark-700">Get started with appointments</p>
        </section>
        <div className="flex flex-col xl:flex-row gap-4">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="fullname"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="phone"
            label="Phone Number"
            placeholder="+977 9856587402"
          />
        </div>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email Address"
          placeholder="example@email.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <div className="flex flex-col xl:flex-row gap-4">
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
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            iconSrc="/assets/icons/password.svg"
            iconAlt="password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        <p className="shad-error">{error && error}</p>
      </form>
    </Form>
  );
};

export default SignupForm;
