import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { FCOLL } from "../firebase/firebase.props";

export const useDocument = (collection: FCOLL, id: string) => {
  const [document, setDocument] = useState();
  const [error, setError] = useState("");

  // realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          //@ts-ignore
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError("");
        } else {
          setError("No such project exists");
        }
      },
      (error) => {
        console.log(error.message);
        setError(error.message);
      }
    );

    return () => unsubscribe();
  }, [collection, id]);

  return { document, error };
};
