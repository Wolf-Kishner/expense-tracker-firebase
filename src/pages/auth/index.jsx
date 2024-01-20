import {
  auth,
  googleAuth,
  microsoftAuth,
  githubAuth,
} from "../../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import React from "react";

//We are using local Storage to save  so that even aafter they close the tab , refresh the tab , switch tabs , leave computer the info will stay there so the USER is still loggedin its not the SAFFEST way to save

//I want to set the "auth" object but we can only store boolean , strin ,number in Local stroage so we convert it to string  We cant store objects so JSON.Stringfigy

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, googleAuth);
      console.log(results);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("User closed the sign-in popup.");
      } else {
        console.error("Error during Google sign-in:", error.message);
      }
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const results = await signInWithPopup(auth, microsoftAuth);
      console.log(results);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("User closed the sign-in popup.");
      } else {
        console.error("Error during Microsoft sign-in:", error.message);
      }
    }
  };

  const signInWithGithub = async () => {
    try {
      const results = await signInWithPopup(auth, githubAuth);
      console.log(results);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("User closed the sign-in popup.");
      } else {
        console.error("Error during GitHub sign-in:", error.message);
      }
    }
  };

  if (isAuth) return <Navigate to="expense-tracker" />;

  return (
    <div className="auth-container">
      <div className="loginContainer">
        <div className="loginCard">
          <h2>Welcome.</h2>
          <p>Welcome to Expense Tracker app. Sign in to get started!</p>

          <button className="btn" id="google" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          <button className="btn" id="micro" onClick={signInWithMicrosoft}>
            Sign in with Microsoft
          </button>
          <button className="btn" id="git" onClick={signInWithGithub}>
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};
