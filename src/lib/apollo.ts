import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import * as App from "@utils/app.utils";
import { getSession } from "next-auth/react";

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include",
});

// const httpLink = createHttpLink({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
// });

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  const token = session?.accessToken;
  return {
    credentials: "include",
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const links = ApolloLink.from([authLink, uploadLink as unknown as ApolloLink]);

const apolloClient = new ApolloClient({
  link: links,
  cache: new InMemoryCache(),
});

export default apolloClient;
