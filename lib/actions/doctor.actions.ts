import axios, { AxiosError } from "axios";
import { parseStringify } from "../utils";
import ApiMethods, { BASE_URL } from "@/apiManager/apiMethods";

export const registerDoctorInfo = async (doctorInfo: FormData) => {
  try {
    const res = await axios.post(
      BASE_URL + "doctors/registerDoctorInfo",
      doctorInfo,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return error.response ? error.response.data : error.message;
    }
    return parseStringify(error);
  }
};

export const getAllDOctors = async () => {
  try {
    const res = await axios.get(BASE_URL + "doctors/getAllDoctors");
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return error.response ? error.response.data : error.message;
    }
    return parseStringify(error);
  }
};

export const getDoctorById = async (token: string, doctorId: string) => {
  try {
    const res = (await ApiMethods.get(
      `doctors/getDoctorById?doctorId=${doctorId}`,
      token
    )) as any;
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return error.response ? error.response.data : error.message;
    }
    return parseStringify(error);
  }
};
