import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { FCOLL } from "../firebase/firebase.props";
import { AUTHDISPATCH } from "../interfaces/DataInterfaces";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError("");
    setIsPending(true);

    // sign the user out
    try {
      // set user to offline before actually signing out
      const { uid } = user!;
      await projectFirestore
        .collection(FCOLL.USERS)
        .doc(uid)
        .update({ online: false });

      await projectAuth.signOut();
      // dispatch logout action
      dispatch({ type: AUTHDISPATCH.LOGOUT });
      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError("");
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
