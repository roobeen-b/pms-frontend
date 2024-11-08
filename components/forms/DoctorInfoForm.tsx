"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl } from "../ui/form";
import { z } from "zod";
import { RegisterDoctorInfoFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import CustomFormField from "../CustomFormField";
import { FormFieldType } from "./SignupForm";
import SubmitButton from "../SubmitButton";
import { SelectItem } from "../ui/select";
import { FileUploader } from "../FileUploader";
import { registerDoctorInfo } from "@/lib/actions/doctor.actions";

interface SpecialtiesProps {
  id: number;
  sname: string;
}

const DoctorInfoForm = ({
  isEdit,
  doctorId,
  specialties,
}: {
  isEdit: boolean;
  doctorId: string;
  specialties: SpecialtiesProps[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof RegisterDoctorInfoFormValidation>>({
    resolver: zodResolver(RegisterDoctorInfoFormValidation),
    defaultValues: {
      doctorLicenseNo: "",
      specialties: specialties[0].sname,
      doctorPhoto: [],
      doctorDesc: "",
    },
  });

  async function onSubmit({
    doctorLicenseNo,
    specialties,
    doctorPhoto,
    doctorDesc,
  }: z.infer<typeof RegisterDoctorInfoFormValidation>) {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("doctorPhoto", doctorPhoto[0]);
      formData.append("doctorId", doctorId);
      formData.append("specialties", specialties);
      formData.append("doctorLicenseNo", doctorLicenseNo);
      formData.append("doctorDesc", doctorDesc);

      const res = await registerDoctorInfo(formData);

      if (res.status) {
        if (res.status == 200) {
          router.push("/login");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-6">
          <p className="sub-header">
            Please fill the remaining details to complete registration
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="specialties"
          label="Specialty"
          placeholder="Choose a specialty"
        >
          {specialties.map((specialty) => (
            <SelectItem key={specialty.id} value={specialty.id.toString()}>
              <div className="flex items-center cursor-pointer gap-2">
                <p>{specialty.sname}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.TEXTAREA}
          name="doctorDesc"
          label="Doctor Description"
          placeholder="Write something about doctor e.g. Personal details, specialties"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="doctorLicenseNo"
          label="Doctor License Number"
          placeholder="111111"
          iconSrc="/assets/icons/email.svg"
          iconAlt="license Number"
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="doctorPhoto"
          label="Upload your photo"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <SubmitButton isLoading={isLoading}>Register</SubmitButton>
        <p className="shad-error">{error && error}</p>
      </form>
    </Form>
  );
};

export default DoctorInfoForm;
