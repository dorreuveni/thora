import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  region: [],
  gender: [],
  scholarship: [],
  dorms: [],
  type: [],
  marriage: [],
  academy: "",
};

export const FilterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setScholarShip: (state, action) => {
      state.scholarship = action.payload;
    },
    setDorms: (state, action) => {
      state.dorms = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setMarriage: (state, action) => {
      state.marriage = action.payload;
    },
    setAcademy: (state, action) => {
      state.academy = action.payload;
    },
    setFiltersState: (state, action) => {
      return action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setAcademy,
  setDorms,
  setFiltersState,
  setGender,
  setMarriage,
  setRegion,
  setScholarShip,
  setType,
  resetFilters,
} = FilterSlice.actions;

export default FilterSlice.reducer;
