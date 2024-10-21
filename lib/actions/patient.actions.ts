import { Query } from "node-appwrite";
import { account, databases, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import axios from "axios";
import ApiMethods, { BASE_URL } from "@/apiManager/apiMethods";
import { revalidatePath } from "next/cache";

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
    return parseStringify(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const currentUser = await users.get(userId);

    return parseStringify(currentUser);
  } catch (error) {
    console.log("Error occured white getting the user: ", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await account.get();
    console.log("action:", currentUser);
    return parseStringify(currentUser);
  } catch (error) {
    console.log("Error occured white getting the user: ", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.log("Error occured white getting the patient: ", error);
  }
};

export const registerPatientInfo = async ({
  // identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // let file;

    // if (identificationDocument) {
    //   const inputFile = InputFile.fromBuffer(
    //     identificationDocument?.get("blobFile") as Blob,
    //     identificationDocument?.get("fileName") as string
    //   );

    //   file = await storage.createFile(
    //     process.env.NEXT_PUBLIC_BUCKET_ID!,
    //     ID.unique(),
    //     inputFile
    //   );
    // }

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
