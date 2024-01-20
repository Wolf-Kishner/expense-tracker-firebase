//ANother HOOK for Getting the Data from the Database and displaying it
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useEffect, useState } from "react";
import { useGetUserInfo } from "./useGetUserInfo";

//We want to return the List of Transactions Made But we need to keep track of the State of Those Transactions
export const useGetTransactions = () => {
  const [transactions, setTranscations] = useState([]);
  const [transactionTotal , setTransactionTotal] = useState({
    balance: 0.0 , 
    income : 0.0 , 
    expenses: 0.0
  }) 
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  //This function exists only inside this HOOK , what we want is Whenever our app is Loaded this function to be constantly listening to the Transactions made ,we dont want to manually call the getTransaction Fucntion for every change
  //Also We  created this as an ext. function Becuz it needs to be async Due to firebase and We cant use async functuons inside useEffect
  //Now to get the Data we are gonna Query the noSQL Database
  const getTransactions = async () => {
    let unsubscribe;
    try {
      //Insdie the query We want to maeke a ref to which collection are we reffreing
      //The query  has another param function which decides how the databse queries are to be made
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );
      //Keep Tracks of Query if there are changes that has a callback functiona And param is Whatever the data we get from teh Query , as Documents are mutiple we are querying on a list so loop through list
      onSnapshot(queryTransactions, (snapshot) => {
        //We want an array which is going to keep track of each of the Documents  
        //We arent doing setTrans(snapshot ) as it is not in the format we want also will have much more info
        let docs = []; //An array contiang an obj containg all the info of Collection with ID , we want to condense the data taht is why we are Looping throught the array and separting for each document and adding to docs array 
        let totalIncome =0;
        let totalExpenses =0;
        unsubscribe = snapshot.forEach((doc) => {
          const data = doc.data();
          //For each specific Transaction we have and ID
          const id = doc.id;
          docs.push({...data, id});
          if(data.transactionType==="expense") {
            totalExpenses += Number (data.transactionAmount);
          }
          else {
            totalIncome += Number(data.transactionAmount);
          }
        });
        setTranscations(docs);
        let balance =  totalIncome - totalExpenses ;
        setTransactionTotal({
          balance, 
          expenses: totalExpenses,
          income:totalIncome
        })
      });
    } catch (err) {
      console.error(err);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions,transactionTotal};
};
