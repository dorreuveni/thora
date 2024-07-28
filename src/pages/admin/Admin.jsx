import React, { useState, useEffect } from "react";
import ExcelUpload from "../../components/ExcelUpload/ExcelUpload";
import { AdminPlaces } from "../../components/AdminPlaces/AdminPlaces";
import "./Admin.css";
import { AdminStatistics } from "../../components/AdminStatistics/AdminStatistics";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";
import Spinner from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { AdminUsers } from "../../components/AdminUsers/AdminUsers";

export const Admin = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userError, setUserError] = useState(false);

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [loggedOut, setLoggedOut] = useState(true);

  const { users } = useSelector((state) => state.users);

  //on auth change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);

        if (loggedOut) checkSignInWithEmail();
        else {
          setLoggedOut(true);
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const sendSignInLink = async () => {
    if (!users?.map((user) => user.email)?.includes(email)) {
      setUserError(true);
      return;
    }

    setUserError(false);
    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      //storing the email in the local storage for the reply
      window.localStorage.setItem("emailForSignIn", email);
      alert("לינק התחברות נשלח למייל");
    } catch (error) {
      console.error("Error sending email link: ", error);
      alert("שליחת הלינק למייל נכשלה, אנא נסו שוב");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setUserError(false);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    sendSignInLink();
  };

  //Checking if the user has signed in
  const checkSignInWithEmail = async () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        alert("נסיון כניסה עם לינק ישן");
        setLoading(false);
        return;
      }
      try {
        //checking if signed in
        const result = await signInWithEmailLink(
          auth,
          email,
          window.location.href
        );
        window.localStorage.removeItem("emailForSignIn");
        setUser(result.user);
      } catch (error) {
        console.error("Error signing in with email link: ", error);
      }
    }
    setLoading(false);
  };

  //handles the signipt
  const handleSignOut = async () => {
    try {
      setLoggedOut(false);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  //the loading spinner
  if (loading) {
    return (
      <div className="admin-container-access">
        <Spinner size={40} />
      </div>
    );
  }

  //the log in page
  if (!user) {
    return (
      <div className="admin-container-access">
        <div className="access-denied-container">
          <h1 className="access-denied-title">כניסת אדמינים</h1>
          <form onSubmit={handleSignInSubmit} className="sign-in-form">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="הכנס את המייל"
              required
              className="sign-in-input"
            />
            {userError && <div className="error-message">משתמש לא קיים</div>}
            <button type="submit" className="sign-in-button">
              התחבר
            </button>
          </form>
        </div>
      </div>
    );
  }

  const options = [<AdminPlaces />, <AdminStatistics />, <AdminUsers />];
  return (
    <div className="admin-container">
      <div className="admin-top-row">
        <ExcelUpload />
        <button className="sign-out-button" onClick={handleSignOut}>
          התנתק
        </button>
      </div>

      <div className="tab-container">
        <div
          onClick={() => setCurrentTab(0)}
          className={currentTab === 0 ? "selected-tab" : "unselected-tab"}>
          מקומות
        </div>
        <div
          onClick={() => setCurrentTab(1)}
          className={currentTab === 1 ? "selected-tab" : "unselected-tab"}>
          סטטיסטיקות
        </div>
        <div
          onClick={() => setCurrentTab(2)}
          className={currentTab === 2 ? "selected-tab" : "unselected-tab"}>
          אדמינים
        </div>
      </div>
      {options[currentTab]}
    </div>
  );
};
