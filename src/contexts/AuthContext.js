import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};
const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await apiService.get("/user/profile");
          const user = response.data.data;

          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        console.log(error);
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/user/login", { email, password });
    const { user, accessToken } = response.data.data;
    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const register = async ({ name, email, password, role, webId }, callback) => {
    const response = await apiService.post("/user/register", {
      name,
      email,
      password,
      role,
      webId,
    });
    const { user, accessToken } = response.data;
    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const logout = (callback) => {
    setSession(null);
    dispatch({
      type: LOGOUT,
    });
    callback();
  };
  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
