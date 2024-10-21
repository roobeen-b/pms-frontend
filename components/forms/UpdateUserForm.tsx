"use client";

import { useEffect, useState } from "react";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { FormFieldType } from "./SignupForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { encryptKey } from "@/lib/utils";
import { UpdateUserFormValidation } from "@/lib/validation";
import { updateUserInfo } from "@/lib/actions/patient.actions";
import { useToast } from "@/hooks/use-toast";

const UpdateUserForm = ({
  token,
  userData,
}: {
  token: string;
  userData: UpdateUserParams;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof UpdateUserFormValidation>>({
    resolver: zodResolver(UpdateUserFormValidation),
    defaultValues: {
      fullname: userData.fullname,
      email: userData.email,
      phone: userData.phone,
    },
  });

  useEffect(() => {
    form.reset({
      fullname: userData.fullname,
      email: userData.email,
      phone: userData.phone,
    });
  }, [userData]);

  async function onSubmit({
    fullname,
    email,
    phone,
  }: z.infer<typeof UpdateUserFormValidation>) {
    setIsLoading(true);
    try {
      const user = { id: userData.id, fullname, email, phone };
      const res = await updateUserInfo(token, user);

      if (res && res.status) {
        if (res.status == 200) {
          const user: {
            id: string;
            fullname: string;
            email: string;
            phone: string;
            role: string;
          } = {
            id: userData.id,
            fullname,
            email,
            phone,
            role: userData.role!,
          };
          localStorage.removeItem("userData");
          const encryptedUserData = encryptKey(JSON.stringify(user));
          localStorage.setItem("userData", encryptedUserData);
          toast({
            title: res.message,
          });
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 mt-4"
      >
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
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email Address"
          placeholder="example@email.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="+977 9856587402"
        />

        <SubmitButton isLoading={isLoading}>Update</SubmitButton>
        <p className="shad-error">{error && error}</p>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
