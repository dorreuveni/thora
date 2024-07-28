import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminUsers.css";
import { AdminUser } from "./AdminUser";
import { setUsers } from "../../redux/users.slice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const AdminUsers = () => {
  const { users } = useSelector((state) => state.users);

  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const [sortBy, setSortBy] = useState("name");

  const dispatch = useDispatch();

  //sorting the places by the name
  const sortByName = (a, b) => {
    return a.name > b.name ? 1 : -1;
  };

  //sorting the places by the email
  const sortByEmail = (a, b) => {
    return a.email > b.email ? 1 : -1;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDoc(doc(db, "users", newUser.email), newUser)
      .then(() => {
        dispatch(setUsers([...users, newUser]));
        setNewUser({ name: "", email: "" });
        alert("אדמין הוסף");
      })
      .catch((e) => {
        console.log("failed to add admin", e);
      });
  };

  return (
    <div className="admin-users-container">
      {/* adding a new user form */}
      <form onSubmit={handleSubmit} className="new-user-form">
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="הכנס שם"
          className="new-user-input"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="הכנס מייל"
          className="new-user-input"
          required
        />
        <button type="submit" className="new-user-button">
          הוסף אדמין
        </button>
      </form>

      {/* the user list */}
      <div className="admin-users-header">
        <div
          className="admin-users-header-item"
          onClick={() => setSortBy("name")}>
          שם
        </div>
        <div
          className="admin-users-header-item"
          onClick={() => setSortBy("email")}>
          מייל
        </div>
      </div>
      {[...users]
        ?.sort(sortBy === "name" ? sortByName : sortByEmail)
        .map((user, index) => (
          <AdminUser key={`admin-user-${index}`} user={user} />
        ))}
    </div>
  );
};
