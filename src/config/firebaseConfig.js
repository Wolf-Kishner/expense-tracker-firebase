// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider , GithubAuthProvider ,OAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB7lOQyKy7mWMy3UGYQkh7cAY6fqqnxOs",
  authDomain: "expensetracker-90967.firebaseapp.com",
  projectId: "expensetracker-90967",
  storageBucket: "expensetracker-90967.appspot.com",
  messagingSenderId: "859348664203",
  appId: "1:859348664203:web:2f4cca201ebe7011eef98e",
  measurementId: "G-1TDBPG9RQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const githubAuth = new GithubAuthProvider();
export const microsoftAuth = new OAuthProvider('microsoft.com');
export const db= getFirestore(app);
//Refrence to our Database 
