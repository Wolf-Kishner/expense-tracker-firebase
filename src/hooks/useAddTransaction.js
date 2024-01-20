//The point of Having custom hooks rather than having to write functions inside of app.js is to Have Logic separeted from the UI  Also It provides Reusability having to avoid to use Context , props to call this function in other component

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";
//We are importing the function addDoc which allows for adding entries in our Collection now we also want to specify to which collectuon this data should be added There may be multiple such Collections
//Firebase Provides the CreatedAt which is a  Timestamp given by firebase gives the time at which a function was called
//Now to access for a Particular user the desc and all we will use the addTrans ke params
export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const {userID} = useGetUserInfo();
  //As This functions deals with Fireabse it should be async
  //Now for the userId we get it from the Local storage
  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType
  }) => {
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };
  return { addTransaction };
};
