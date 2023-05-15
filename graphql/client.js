import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import storage from "../utils/storage";
import config from "../config";
import { onError } from "apollo-link-error";

// const NETWORK_INTERFACE_URL = 'https://5868f3df.ngrok.io'
// const httpLink = new HttpLink({ uri: NETWORK_INTERFACE_URL });

// const logoutLink = onError(({ networkError }) => {
//   if (networkError.statusCode === 401) console.log('401!!!!');
// })
export const API_URI = config.API_URI;

const httpLink = new HttpLink({ uri: API_URI + "/graphql" });

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await storage.getItem("USER_TOKEN");

  // console.log(token.token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.token}` : "",
    },
  };
});

const link = onError((e) => {
  console.log("Error Handler ", e);
  // console.log("Error Handler", JSON.stringify(e));
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: link.concat(authLink).concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions,
});

// client.query({
//   query:
// })
export default client;
