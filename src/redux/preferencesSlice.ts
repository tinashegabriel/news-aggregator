import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of our state
interface PreferencesState {
  sources: string[];
  categories: string[];
}

const initialState: PreferencesState = {
  sources: [""],
  categories: [""],
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setSources: (state, action: PayloadAction<string[]>) => {
      state.sources = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
  },
});

// Export actions
export const { setSources, setCategories } = preferencesSlice.actions;

// Export reducer
export default preferencesSlice.reducer;
