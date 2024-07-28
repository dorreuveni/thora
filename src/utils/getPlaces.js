import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { sortByName } from "./sorting";
/**
 * getting the places from firebase
 */
export const getPlaces = async () => {
  const dbPlaces = [];
  try {
    //getting the data from the firebase
    const querySnapshot = await getDocs(collection(db, "places"));
    querySnapshot.forEach((doc) => {
      dbPlaces.push({
        ...doc.data(),
        id: doc.id,
      });
    });
  } catch (e) {
    console.log(e);
  }

  //setting the places and removing the loading
  return dbPlaces.sort(sortByName);
};
