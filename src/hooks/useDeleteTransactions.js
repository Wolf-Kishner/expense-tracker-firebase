import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

// In order to delete, you need the exact collection and a specific document ID
// the useDeleteTransactions hook is returning a function that can be called directly in your component's onDelete function.
export const useDeleteTransactions = () => {
  return async (documentId) => {
    const collectionRef = doc(db, "transactions", documentId);

    try {
      await deleteDoc(collectionRef);
      console.log("Document Deleted!");
    } catch (error) {
      console.error("Error Removing Document", error);
    }
  };
};
