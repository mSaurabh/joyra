import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { AUTHDISPATCH } from "../interfaces/DataInterfaces";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string, captcha: string) => {
    setError("");
    setIsPending(true);

    // sign the user in
    try {
      if (!captcha) {
        throw Error("Please Check the Captcha");
      }
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      // dispatch login action
      dispatch({ type: AUTHDISPATCH.LOGIN, payload: res.user });

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
    return () => {
      console.log("Cleanup useLogin");
      setIsCancelled(true);
    };
  }, []);

  return { login, error, isPending };
};
