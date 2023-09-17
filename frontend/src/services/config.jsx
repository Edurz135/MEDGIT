import axios from "axios";
import { LocalStorageServices } from ".";
import { ConstantLocalStorage } from "../utils/constant";

const BASE_URL = "http://localhost:3100";
const instance = axios.create({ baseURL: BASE_URL });

// REQUEST INTERCEPTORS
instance.interceptors.request.use((config) => {
  const token = LocalStorageServices.GetData(ConstantLocalStorage.token_key);
  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

// RESPONSE INTERCEPTORS
instance.interceptors.response.use((response) => {
  console.log('RESPONSE', response);
  return response.data;
}, (error) => {
  console.log('ERROR', error);
  return Promise.reject(error)
})

export default instance;