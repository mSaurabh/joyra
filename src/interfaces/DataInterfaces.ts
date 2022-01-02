import firebase from "firebase";

export enum AUTHDISPATCH {
  "LOGIN" = "LOGIN",
  "LOGOUT" = "LOGOUT",
  "AUTH_IS_READY" = "AUTH_IS_READY",
}

export interface IAuthContextState {
  user: firebase.User | null;
  authIsReady: boolean;
  dispatch: React.Dispatch<IDispatchType>;
}

export interface ITransactions {
  /** transaction id */
  id: string;
  /** transaction amount */
  amount: string;
  /** transaction created at */
  createdAt: firebase.firestore.Timestamp;
  /** transaction deleted or not */
  isDeleted: boolean;
  /** transaction name */
  name: string;
  uid: string;
}
export interface IDispatchType {
  type: string;
  payload?: any;
}
