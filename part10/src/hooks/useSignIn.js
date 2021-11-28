import { useMutation } from "@apollo/client";
import { GET_AUTHORIZATION } from "../qraphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(GET_AUTHORIZATION);

  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { credentials: { username, password } } });
    await authStorage.setAccessToken(response.data.authorize.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;