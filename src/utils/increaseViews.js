import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { store } from "../redux/store";
import { setPlaces } from "../redux/place.slice";

//add a view for the location
export const addView = async (place) => {
  await updateDoc(doc(db, "places", place.id), {
    views: increment(1),
  });

  //updating the redux
  const state = store.getState();
  store.dispatch(
    setPlaces(
      state.places.places.map((item) => {
        if (item.id === place.id) return { ...item, views: item.views + 1 };
        return item;
      })
    )
  );
};
