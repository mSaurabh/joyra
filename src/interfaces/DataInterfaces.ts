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

export interface IUser {
  /** user id */
  id: string | null;
  /** user display name */
  displayName: string | null;
  /** user online status */
  online: boolean;
  /** user photo url */
  photoURL: string | null;
  /** user created at */
  createdAt: firebase.firestore.Timestamp;
}

export interface ICategory {
  /** category id */
  id?: string;
  /** category value */
  value: string;
  /** category label */
  label: string;
}

export interface IProject {
  /** project name */
  name: string;
  /** project details */
  details: string;
  /** project category */
  category: ICategory["value"];
  /** project due date */
  dueDate: firebase.firestore.Timestamp;
  /** project assigned to */
  assignedUsersList: { displayName: string; photoURL: string; id: string }[];
  /** project comments */
  comments: IComment[];
  /** project createdBy */
  createdBy: Partial<IUser>;
}

export interface IComment {
  id: string;
  content: string;
  createdAt: firebase.firestore.Timestamp;
  displayName: string;
  photoURL: string;
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

export const categories: ICategory[] = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];
