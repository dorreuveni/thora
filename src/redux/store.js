import { configureStore } from "@reduxjs/toolkit";
import PlaceSlice from "./place.slice";
import FilterSlice from "./filters.slice";
import usersSlice from "./users.slice";

export const store = configureStore({
  reducer: {
    places: PlaceSlice,
    filters: FilterSlice,
    users: usersSlice,
  },
});
