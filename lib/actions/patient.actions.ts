import { parseStringify } from "../utils";
import axios, { AxiosError } from "axios";
import ApiMethods, { BASE_URL } from "@/apiManager/apiMethods";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = {
      email: user.email,
      phone: user.phone,
      password: user.password,
      confirmPassword: user.confirmPassword,
      fullname: user.fullname,
      role: user.role,
    };

    const res = await axios.post(BASE_URL + "register", newUser);

    if (res) {
      return res.data;
    } else {
      throw new Error("An error occured. Please try again!");
    }
  } catch (error) {
    console.error("An error occurred while creating a new user:", error);
    if (error instanceof AxiosError) {
      return error.response ? error.response.data : error.message;
    }
    return parseStringify(error);
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = {
      email,
      password,
    };

    const res = await axios.post(BASE_URL + "login", user);
    if (res) {
      return res.data;
    } else {
      throw new Error("An error occured. Please try again!");
    }
  } catch (error) {
    console.log(`Error occured while login: ${error}`);
    if (error instanceof AxiosError) {
      return error.response ? error.response.data : error.message;
    }
    return parseStringify(error);
  }
};

export const registerPatientInfo = async ({
  ...patient
}: RegisterUserParams) => {
  try {
    const res = await axios.post(BASE_URL + "patient/registerPatientInfo", {
      ...patient,
    });
    if (res) {
      return res;
    } else {
      throw new Error("An error occured. Please try again!");
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return error.response ? error.response.data : error.message;
    }
    return parseStringify(error);
  }
};

export const updatePatientInfo = async (
  patientData: RegisterUserParams,
  token: string
) => {
  try {
    const res = await ApiMethods.put(
      "patient/updatePatientInfo",
      { ...patientData },
      token
    );
    if (res) {
      return res;
    } else {
      throw new Error("An error occured. Please try again!");
    }
  } catch (error) {
    console.log(error);
    return parseStringify(error);
  }
};

export const getPatientInfo = async (token: string) => {
  try {
    const res = (await ApiMethods.get("patient/getPatientInfo", token)) as any;
    if (res) {
      const data = await res.data;
      return data;
    }
  } catch (error) {
    console.log(`Error fetching patient data: ${error}`);
    return parseStringify(error);
  }
};

export const updateUserInfo = async (
  token: string,
  userData: UpdateUserParams
) => {
  try {
    const res = (await ApiMethods.put(
      "updateUserInfo",
      userData,
      token
    )) as any;

    if (res) {
      return res;
    }
  } catch (error) {
    console.log(`Error updating user data: ${error}`);
    return parseStringify(error);
  }
};
