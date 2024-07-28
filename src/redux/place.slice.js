import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  places: [],
  current: null,
  loading: false,
  academies: [],
};

export const PlaceSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setPlaces: (state, action) => {
      state.places = action.payload;
    },

    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAcademies: (state, action) => {
      state.academies = action.payload;
    },
  },
});

export const { setPlaces, setCurrent, setLoading, setAcademies } =
  PlaceSlice.actions;

export default PlaceSlice.reducer;
