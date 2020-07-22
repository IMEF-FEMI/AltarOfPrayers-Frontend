import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { AUTH_TOKEN } from "../utils/constants";
import { ApolloClient, InMemoryCache } from "apollo-boost";


  const httpLink = createHttpLink({
    uri: `ec2-3-23-126-86.us-east-2.compute.amazonaws.com/graphql/`,
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
  



