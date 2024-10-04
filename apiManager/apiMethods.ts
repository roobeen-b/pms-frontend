import axios from "axios";

export const BASE_URL = "http://localhost:5000/";

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

class ApiMethods {
  static apiRequest(method: string, url: string, body = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: BASE_URL + url,
        data: body,
        headers: getHeaders(),
        withCredentials: true,
      })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  static get(url: string) {
    return this.apiRequest("GET", url);
  }

  static post(url: string, data: object) {
    return this.apiRequest("POST", url, data);
  }

  static put(url: string, data: object) {
    return this.apiRequest("PUT", url, data);
  }

  static delete(url: string) {
    return this.apiRequest("DELETE", url);
  }
}

export default ApiMethods;
