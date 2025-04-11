import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  randomItems: [],
  randomOffers: [],
};

const randomExtraItems = createSlice({
  name: "randomExtraItems",
  initialState,
  reducers: {
    setRandomItems: (state, action) => {
      state.randomItems = action.payload;
    },
    setRandomOffers: (state, action) => {
      state.randomOffers = action.payload;
    },
  },
});

export const { setRandomItems, setRandomOffers } = randomExtraItems.actions;
export default randomExtraItems.reducer;
