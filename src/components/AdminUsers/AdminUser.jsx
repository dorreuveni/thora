import React from "react";
import "./AdminUsers.css";
import { UserDeletionModal } from "../DeletionModal/UserDeletionModal";

export const AdminUser = (props) => {
  const { user } = props;

  return (
    <div className="admin-user-container">
      <div className="admin-user-name">{user.name}</div>
      <div className="admin-user-views">{user.email}</div>
      <UserDeletionModal userEmail={user?.email} name={user?.name} />
    </div>
  );
};
