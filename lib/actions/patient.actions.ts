import { Query } from "node-appwrite";
import { account, databases, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import axios from "axios";

// import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = {
      email: user.email,
      phone: user.phone,
      password: user.password,
      confirmPassword: user.confirmPassword,
      fullname: user.fullname,
    };

    const res = await axios.post("http://localhost:5000/register", newUser);

    if (res) {
      return res.data;
    } else {
      throw new Error("An error occured. Please try again!");
    }
  } catch (error) {
    console.error("An error occurred while creating a new user:", error);
    return error;
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

    const res = await axios.post("http://localhost:5000/login", user);
    if (res) {
      return res.data;
    } else {
      throw new Error("An error occured. Please try again!");
    }
  } catch (error) {
    console.log(`Error occured while login: ${error}`);
    return error;
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

export const registerPatient = async ({
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

    const res = await axios.post(
      "http://localhost:5000/patient/registerPatientInfo",
      { ...patient }
    );
    if (res) {
      const data = await res.data;
      return data;
    } else {
      throw new Error("An error occured. Please try again!");
    }

    // const newPatient = await databases.createDocument(
    //   process.env.NEXT_PUBLIC_DATABASE_ID!,
    //   process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
    //   ID.unique(),
    //   {
    //     identificationDocumentId: file?.$id || null,
    //     identificationDocumentUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
    //     ...patient,
    //   }
    // );

    // return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
