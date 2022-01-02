import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { FCOLL } from "../firebase/firebase.props";

export const useCollection = (
  cName: FCOLL,
  deleted?: boolean,
  _query?: [string, firebase.default.firestore.WhereFilterOp, string],
  _orderBy?: [string, firebase.default.firestore.OrderByDirection]
) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [error, setError] = useState("");

  /*//=NOTE if we don't use a ref --> infinite loop in useEffect 
    //= (since array or objects are reference types & they are always looked as different even when the value is the same)
    //= _query is an array and if "different" on every function call (reference wise)
  */
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;
  useEffect(() => {
    let ref = projectFirestore
      .collection(cName)
      .where("isDeleted", "==", deleted ? true : false);

    if (query) {
      //@ts-ignore
      ref = ref.where(...query);
    }

    if (orderBy) {
      // @ts-ignore
      ref = ref.orderBy(...orderBy);
    }
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results: any[] = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError("");
      },
      (error: any) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [cName, query, orderBy]);

  return { documents, error };
};
