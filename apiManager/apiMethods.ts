import axios from "axios";

export const BASE_URL = "http://localhost:5000/";

class ApiMethods {
  static apiRequest(method: string, url: string, token: string, body?: object) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: BASE_URL + url,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  static get(url: string, token: string) {
    return this.apiRequest("GET", url, token);
  }

  static post(url: string, data: object, token: string) {
    return this.apiRequest("POST", url, token, data);
  }

  static put(url: string, data: object, token: string) {
    return this.apiRequest("PUT", url, token, data);
  }

  static delete(url: string, token: string) {
    return this.apiRequest("DELETE", url, token);
  }
}

export default ApiMethods;
