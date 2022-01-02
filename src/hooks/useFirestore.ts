import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
import { FCOLL, FIREACT } from "../firebase/firebase.props";

interface IFirestoreHookState {
  document: null | any;
  isPending: boolean;
  error: string | null;
  success: boolean;
}

let initialState: IFirestoreHookState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const firestoreReducer = (state: any, action: any) => {
  //NOTE Notice how there is no break in the switch case,
  //     that's cause we are using return and hence break is not needed.
  switch (action.type) {
    case FIREACT.IS_PENDING:
      // explicitly resetting the state
      return { isPending: true, document: null, success: false, error: null };
    case FIREACT.ADDED_DOCUMENT:
      // isPending = false becuase at this point it is done
      // adding document to firestore collection
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case FIREACT.SOFT_DELETED_DOCUMENT:
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case FIREACT.RESTORE_DOCUMENT:
      return { isPending: false, document: null, success: true, error: null };
    case FIREACT.ERROR:
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (cName: FCOLL) => {
  //NOTE can be named state but here we are calling it response
  // to idicate that its a response from firestore
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const ref = projectFirestore.collection(cName);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action: any) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };
  // add document
  const addDocument = async (doc: any) => {
    dispatch({ type: FIREACT.IS_PENDING });
    try {
      const createdAt = timestamp.fromDate(new Date());

      const addedDocument = await ref.add({
        ...doc,
        createdAt,
        isDeleted: false,
      });

      dispatchIfNotCancelled({
        type: FIREACT.ADDED_DOCUMENT,
        payload: addedDocument,
      });
    } catch (error: any) {
      dispatchIfNotCancelled({ type: FIREACT.ERROR, payload: error.message });
    }
  };

  // soft delete document
  const deleteDocument = async (id: string) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const deletedDocument = await ref.doc(id).update({ isDeleted: true });
      dispatchIfNotCancelled({
        type: FIREACT.SOFT_DELETED_DOCUMENT,
      });
    } catch (error: any) {
      console.log(error);
      dispatchIfNotCancelled({
        type: FIREACT.ERROR,
        payload: "Could not delete document",
      });
    }
  };

  // restore document
  const restoreDocument = async (id: string) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const deletedDocument = await ref.doc(id).update({ isDeleted: false });
      dispatchIfNotCancelled({
        type: FIREACT.RESTORE_DOCUMENT,
      });
    } catch (error: any) {
      console.log(error);
      dispatchIfNotCancelled({
        type: FIREACT.ERROR,
        payload: "Could not restore document",
      });
    }
  };

  const hardDelete = async (id: string) => {
    await ref.doc(id).delete();
  };

  // cleanup function when component unmounted
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, hardDelete, restoreDocument, response };
};
