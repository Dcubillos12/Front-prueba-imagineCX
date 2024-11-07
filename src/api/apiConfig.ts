import axios from "axios";

const api = "http://localhost:3000/contacts";
const USERNAME = "ICXCandidate";
const PASSWORD = "Welcome2024";

const apiClient = axios.create({
  baseURL: api,
  auth: {
    username: USERNAME,
    password: PASSWORD,
  },
});

export default apiClient;
