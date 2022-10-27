import Cookies from "universal-cookie";
import * as CryptoJS from "@lib/crypto";

const storeType = process.env.NEXT_PUBLIC_TOKEN_STORE || "";
export const accessCookieName = process.env.NEXT_PUBLIC_ACCESS_COOKIE_NAME || "";
export const refreshCookieName = process.env.NEXT_PUBLIC_REFRESH_COOKIE_NAME || "";

export const storeAccessToken = (value: string) => {
  switch (storeType) {
    case "none":
      break;
    case "local":
      sessionStorage.setItem(accessCookieName, value ? CryptoJS.encrypt(value) : value);
      break;
    case "cookie":
      const cookies = new Cookies(document.cookie);
      cookies.set(accessCookieName, value, { httpOnly: true, secure: true, sameSite: "none", path: "/" });
      break;
    default:
      break;
  }
};

export const getAccessToken = (): string => {
  let token;
  switch (storeType) {
    case "none":
      return "";
    case "local":
      token = sessionStorage.getItem(accessCookieName) || "";
      break;
    case "cookie":
      const cookies = new Cookies(document.cookie);
      token = cookies.get(accessCookieName);
      break;
    default:
      return "";
  }
  return token ? CryptoJS.decrypt(token) : token;
};

export const removeAccessToken = () => {
  switch (storeType) {
    case "none":
      break;
    case "local":
      localStorage.removeItem(accessCookieName);
      break;
    case "cookie":
      const cookies = new Cookies(document.cookie);
      cookies.remove(accessCookieName);
      break;
    default:
      break;
  }
};

export const storeRefreshToken = (value: string) => {
  switch (storeType) {
    case "none":
      break;
    case "local":
      localStorage.setItem(refreshCookieName, value);
      break;
    case "cookie":
      const cookies = new Cookies(document.cookie);
      cookies.set(refreshCookieName, value, { httpOnly: true, secure: true, sameSite: "none", path: "/" });
      break;
    default:
      break;
  }
};

export const getRefreshToken = (): string => {
  switch (storeType) {
    case "none":
      return "";
    case "local":
      return localStorage.getItem(refreshCookieName) || "";
    case "cookie":
      const cookies = new Cookies(document.cookie);
      return cookies.get(refreshCookieName);
    default:
      return "";
  }
};

export const removeRefreshToken = () => {
  switch (storeType) {
    case "none":
      break;
    case "local":
      localStorage.removeItem(refreshCookieName);
      break;
    case "cookie":
      const cookies = new Cookies(document.cookie);
      cookies.remove(refreshCookieName);
      break;
    default:
      break;
  }
};
