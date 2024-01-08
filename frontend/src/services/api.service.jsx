import axios from "axios";

export default class ApiService {
  #token;

  constructor() {
    this.#token = localStorage.getItem("token");
  }

  getToken() {
    return this.#token;
  }

  setToken(token) {
    this.#token = token;

    return this;
  }

  get(url) {
    const config = { headers: {} };

    if (this.#token) {
      config.headers.Authorization = `bearer ${this.#token}`;
    }
    console.log(config);

    axios.get(url, config);
  }
}
