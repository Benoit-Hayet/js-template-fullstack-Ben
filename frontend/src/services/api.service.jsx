import axios from "axios";

export default class ApiService {
  #baseUrl = "http://localhost:3310";

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

  getConfig() {
    const config = { headers: {} };

    if (this.#token) {
      config.headers.Authorization = `bearer ${this.#token}`;
    }

    return config;
  }

  get(url) {
    return axios.get(`${this.#baseUrl}${url}`, this.getConfig());
  }

  async post(url, content) {
    const { data } = await axios.post(
      `${this.#baseUrl}${url}`,
      content,
      this.getConfig()
    );
    return data;
  }
}
