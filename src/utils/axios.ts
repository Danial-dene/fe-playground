import axios from "axios";
import _ from "lodash";
import { getSession } from "next-auth/react";
import { serviceOptions } from "src/api";
import Cookies from "universal-cookie";

export const apiCaller = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  withCredentials: true,
});

apiCaller.interceptors.request.use(async (config: any) => {
  const session = await getSession();
  config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
  return config;
});

// const checkAndUpdateToken = (response: any) =>
//   new Promise((resolve, reject) => {
//     try {
//       if (!_.get(response, "data.accessToken", {})) return reject();
//       if (!_.get(response, "data.refreshToken", {})) return reject();
//       const { accessToken } = response.data;

//       setGlobalHeader(accessToken);

//       return resolve({});
//     } catch (e) {
//       return reject(e);
//     }
//   });

// const onSuccessResponse = async (response: any) => {
//   const acsToken = _.get(response, "data.accessToken", null);
//   const rfsToken = _.get(response, "data.refreshToken", null);
//   if (acsToken) {
//     cookies.set("accessToken", acsToken, {
//       path: "/",
//       httpOnly: false,
//       sameSite: true,
//     });
//     setGlobalHeader(acsToken);
//   }
//   if (rfsToken) {
//     cookies.set("refreshToken", rfsToken, {
//       path: "/",
//       httpOnly: false,
//       sameSite: true,
//     });
//   }
//   if (response.status === 200 || response.status === 201) {
//     await checkAndUpdateToken(response);
//   }
//   return response;
// };

// const onErrorResponse = async (error: any) => {
//   return Promise.reject(error);
// };

// export const setGlobalHeader = (token?: string) => {
//   const tokenValue = token || cookies.get("accessToken");

//   if (_.isEmpty(tokenValue)) return;
//   apiCaller.defaults.headers.common = {
//     Authorization: `Bearer ${tokenValue}`,
//   };

//   return tokenValue;
// };

// setGlobalHeader();

// apiCaller.interceptors.response.use(onSuccessResponse, onErrorResponse);
serviceOptions.axios = apiCaller;
export default apiCaller;
