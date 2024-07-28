import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
/**
 * getting the places from firebase
 */
export const getUsers = async () => {
  const dbUsers = [];
  try {
    //getting the data from the firebase
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      dbUsers.push({
        email: doc.id,
        name: doc.data().name,
      });
    });
  } catch (e) {
    console.log(e);
  }

  //setting the places and removing the loading
  return dbUsers;
};
