import Axios from "axios";
import app from "config/app";

const axios: any = Axios.create({
  baseURL: app.serverURL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;
