// api/apiConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:5000/api" : "",
});

export default instance;
