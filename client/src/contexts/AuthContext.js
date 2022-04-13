import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    error: null,
  });

  // Authenticate user
  const authenticate = async () => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)) {
      setAuthToken(localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME));
    }
    try {
      const res = await axios.get(`${apiUrl}/auth`);
      if (res.data.success) {
        authDispatch({
          type: "SET_AUTH",
          payload: {
            user: res.data.user,
            isAuthenticated: true,
          },
        });
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
        authDispatch({
            type: "SET_AUTH",
            payload: {
                user: null,
                isAuthenticated: false,
            },
        });
    }
  };

  useEffect(() => {
    authenticate();
    }, []);

    // login user
  const loginUser = async (userForm) => {
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, userForm);

      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.token);
      }
      await authenticate();
      return res.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, msg: error.message };
    }
  };

  // register user
    const registerUser = async (userForm) => {
        try {
            const res = await axios.post(`${apiUrl}/auth/register`, userForm);
            if (res.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.token);
            }
            await authenticate();
            return res.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, msg: error.message };
        }
    };

    // Logout
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		authDispatch({
			type: 'SET_AUTH',
			payload: { isAuthenticated: false, user: null }
		})
	}




  const authContextValue = { loginUser , authState, registerUser, logoutUser };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
