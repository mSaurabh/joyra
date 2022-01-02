import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";
import {
  AUTHDISPATCH,
  IAuthContextState,
  IDispatchType,
} from "../interfaces/DataInterfaces";

export const AuthContext = createContext<IAuthContextState>(
  {} as IAuthContextState
);

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case AUTHDISPATCH.LOGIN:
      return { ...state, user: action.payload };
    case AUTHDISPATCH.LOGOUT:
      return { ...state, user: null };
    case AUTHDISPATCH.AUTH_IS_READY:
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [state, dispatch]: [
    state: IAuthContextState,
    dispatch: React.Dispatch<IDispatchType>
  ] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: AUTHDISPATCH.AUTH_IS_READY, payload: user });
      unsub();
    });
  }, []);

  // console.log("AuthContext State ", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
