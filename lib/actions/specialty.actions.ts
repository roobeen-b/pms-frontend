import axios from "axios";
import { parseStringify } from "../utils";
import { BASE_URL } from "@/apiManager/apiMethods";

export const getAllSpecialties = async () => {
  try {
    const res = await axios.get(BASE_URL + "specialty/getAllSpecialties");
    if (res) {
      const result = await res.data;
      return result;
    }
  } catch (error) {
    console.log(`Error fetching specialty data: ${error}`);
    return parseStringify(error);
  }
};
