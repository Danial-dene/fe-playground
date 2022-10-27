import { apiCaller } from "@utils/axios";
import axios from "axios";
import _ from "lodash";
import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials property is used to generate a suitable form on the sign in page.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const { refreshToken, accessToken } = credentials as any;

          if (refreshToken && accessToken) {
            return { refreshToken, accessToken };
          }

          const res = await axios({
            method: "post",
            url: `${process.env.NEXT_AUTH_PUBLIC_API_URL}/api/auth/admin/sign-in`,
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });

          if (res.data.accessToken) {
            return res.data;
          } else {
            return null;
          }
        } catch (e: any) {
          throw new Error("There was an error on admin authentication");
        }
      },
    }),
  ],
  callbacks: {
    //if true
    async signIn({ user }) {
      let token: any = null;
      if (token) {
        user.accessToken = token.accessToken;
        user.refreshToken = token.refreshToken;
      }

      return !_.isEmpty(token) || !_.isEmpty(user);
    },

    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      let newToken = token;

      if (user) {
        // This will only be executed at login. Each next invocation will skip this part.
        token.accessToken = user.accessToken;
        // token.accessTokenExpiry = user.accessTokenExpiry;
        token.refreshToken = user.refreshToken;
      }

      // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
      const shouldRefreshTime = Math.round(
        // token.accessTokenExpiry - 60 * 60 * 1000 - Date.now()
        1654690700 - 60 * 60 * 1000 - Date.now()
      );

      // If the token is still valid, just return it.
      if (shouldRefreshTime > 0) {
        return Promise.resolve(token);
      }

      // If the call arrives after 23 hours have passed, we allow to refresh the token.
      newToken = await refreshAccessToken(token);
      return Promise.resolve(newToken);
    },
    session: async ({ session, token }) => {
      // Here we pass accessToken to the client to be used in authentication with your API
      session.accessToken = token.accessToken;

      apiCaller.defaults.headers.common = {
        Authorization: `Bearer ${token.accessToken}`,
      };

      return Promise.resolve(session);
    },
  },
  jwt: {
    secret: process.env.NEXT_AUTH_JWT_SECRET,
    // encryption: true,
  },
  session: {
    // jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
});

const refreshAccessToken = async (tokenObject: JWT) => {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await apiCaller.post(
      `${process.env.NEXTAUTH_URL}/api/auth/admin/revoke-authentication`,
      {
        refreshToken: tokenObject.refreshToken,
      }
    );

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      // accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
      refreshToken: tokenResponse.data.refreshToken,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
};
