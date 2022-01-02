import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { AUTHDISPATCH } from "../interfaces/DataInterfaces";
import { useAuthContext } from "./useAuthContext";

// interface ISignupProps {}

const useSignup = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (
    email: string,
    password: string,
    displayName: string,
    captcha: string
  ) => {
    setIsPending(true);
    setError("");

    try {
      if (email && password && displayName) {
        if (!captcha) {
          throw Error("Please Check the Captcha");
        }
        // signup user
        const res = await projectAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        // console.log(res.user);

        if (!res) {
          throw new Error("Could not signup the user.");
        }

        // add display name to user
        await res.user?.updateProfile({ displayName: displayName });

        // dispatch login action
        dispatch({ type: AUTHDISPATCH.LOGIN, payload: res.user });

        if (!isCancelled) {
          setIsPending(false);
          setError("");
        }
      } else {
        throw new Error("Missing user info. Please check your entry");
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //NOTE Cleanup function to avoid memory leaks or state update when component is unmounted
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};

export default useSignup;
