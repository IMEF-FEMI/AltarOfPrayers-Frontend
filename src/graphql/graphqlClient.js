import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "../utils/constants";
import { ApolloClient, InMemoryCache } from "apollo-boost";


  const httpLink = createHttpLink({
    uri: `https://altarofprayers.com/graphql/`,
    // uri: `http://192.168.43.74:8000/graphql/`,
  });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : "",
      },
    };
  });
  
  export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    notifyOnNetworkStatusChange: true,
  });
  



