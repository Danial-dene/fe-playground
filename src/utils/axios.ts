import axios from "axios";
import _ from "lodash";
import { getSession } from "next-auth/react";

import Cookies from "universal-cookie";
import { serviceOptions } from "../api";

export const apiCaller = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  withCredentials: true,
});

apiCaller.interceptors.request.use(async (config: any) => {
  const session = await getSession();

  console.log("session", session);
  config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
  return config;
});

serviceOptions.axios = apiCaller;
export default apiCaller;
