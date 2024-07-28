import React, { useRef, useState, useEffect } from "react";
import "./DeletionModal.css";
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/users.slice";

export const UserDeletionModal = (props) => {
  const { userEmail, name } = props;
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  /**
   * hadling the deletion of the place
   */
  const handleDelete = async () => {
    try {
      //deleting the doc
      await deleteDoc(doc(db, "users", userEmail));

      // updating the redux store
      dispatch(setUsers(users.filter((user) => user.email !== userEmail)));

      // closing the modal
      setIsOpen(false);
      alert("המשתמש נמחק בהצלחה!");
    } catch (error) {
      setIsOpen(false);
      console.error("Error removing document: ", error);
      alert("המחיקה נכשלה");
    }
  };

  //when clicking outside close the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  //adding the click outside event
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* the openning button */}
      <button className="delete-modal-opener" onClick={() => setIsOpen(true)}>
        מחק
      </button>

      {/* the actual modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div ref={modalRef} className="modal-content">
            <h2>מחיקה</h2>
            <p>
              האם אתה בטוח שאתה רוצה למחוק את {name} : {userEmail}?
            </p>
            <div className="modal-actions">
              <button onClick={() => setIsOpen(false)}>בטל</button>
              <button onClick={handleDelete} className="delete-button">
                מחק
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
