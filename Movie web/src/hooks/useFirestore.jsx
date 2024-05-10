import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs
} from "firebase/firestore";
import { database } from "../firebase";
export default function useFirestore() {
  // to get collection data
  let getCollection = (collectionName, id) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const ref = collection(database, collectionName);
          const snapshot = await getDocs(ref);
          const collectionData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setData(collectionData);
          setLoading(false);
          setError("");
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      fetchData();
    }, []);
    return { loading, error, data };
  };

  // to get document data
  let getDocument = (collectionName, id) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);

        const docRef = doc(database, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLoading(false);
        } else {
          setError("Oops! Something went wrong. Please try again later.");
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    return { loading, error, data };
  };

  // to add document
  let addCollection = async (collectionName, data) => {
    let ref = collection(database, collectionName);
    return addDoc(ref, data);
  };
  let deleteDocument = (collectionName, id) => {
    let ref = doc(database, collectionName, id);
    deleteDoc(ref);
  };

  return { getCollection, getDocument, addCollection, deleteDocument };
}
