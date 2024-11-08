import axios from "axios";

const api = import.meta.env.VITE_API_URL || "/api/contacts";
const USERNAME = "ICXCandidate";
const PASSWORD = "Welcome2024";

const apiClient = axios.create({
  baseURL: api,
  auth: {
    username: USERNAME,
    password: PASSWORD,
  },
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default apiClient;
