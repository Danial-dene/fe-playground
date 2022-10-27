/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface IRequestOptions extends AxiosRequestConfig {}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(
  configs: IRequestConfig,
  resolve: (p: any) => void,
  reject: (p: any) => void
): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    throw new Error("please inject yourself instance like axios  ");
  }
}

export function getConfigs(
  method: string,
  contentType: string,
  url: string,
  options: any
): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    "Content-Type": contentType,
  };
  return configs;
}

export const basePath = "";

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

console.log("basePath", basePath);

// customer definition
// empty

export class UserAuthService {
  /**
   * Sign In
   */
  static signIn(
    params: {
      /** requestBody */
      body?: SignInInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AuthTokenResDTO> {
    return new Promise((resolve, reject) => {
      let url = basePath + "/api/auth/admin/sign-in";
      console.log("url", url);
      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Sign In
   */
  static checkSession(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + "/api/admin/admin/check-session";

      const configs: IRequestConfig = getConfigs(
        "get",
        "application/json",
        url,
        options
      );

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Sign Out
   */
  static signOut(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + "/api/auth/admin/logout";

      const configs: IRequestConfig = getConfigs(
        "get",
        "application/json",
        url,
        options
      );

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Refresh Token
   */
  static revokeAuthentication(
    params: {
      /** requestBody */
      body?: RevokeTokenInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AuthTokenResDTO> {
    return new Promise((resolve, reject) => {
      let url = basePath + "/api/auth/admin/revoke-authentication";

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Reset Password
   */
  static forgetPassword(
    params: {
      /** requestBody */
      body?: ForgetPasswordInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + "/api/auth/admin/forget-password";

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Reset Password
   */
  static resetPassword(
    params: {
      /** requestBody */
      body?: ResetPasswordInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + "/api/auth/admin/reset-password";

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Change Password
   */
  static changePassword(
    params: {
      /** requestBody */
      body?: ChangePasswordInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + "/api/auth/admin/change-password";

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Change Password
   */
  static deactivateUser(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + "/api/auth/admin/deactivate-user";

      const configs: IRequestConfig = getConfigs(
        "post",
        "application/json",
        url,
        options
      );

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export interface SignInInput {
  /**  */
  email: string;

  /**  */
  password: string;
}

export interface AuthTokenResDTO {
  /**  */
  accessToken: string;

  /**  */
  refreshToken: string;

  /**  */
  accessTokenExpiry: number;
}

export interface RevokeTokenInput {
  /**  */
  refreshToken: string;
}

export interface ForgetPasswordInput {
  /**  */
  email: string;
}

export interface ResetPasswordInput {
  /**  */
  token: string;

  /**  */
  newPassword: string;
}

export interface ChangePasswordInput {
  /**  */
  oldPassword: string;

  /**  */
  newPassword: string;
}
