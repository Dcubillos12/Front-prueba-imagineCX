import axios from "axios";

const api = "/api/contacts";
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
