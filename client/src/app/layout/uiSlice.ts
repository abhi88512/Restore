import { createSlice } from "@reduxjs/toolkit";

const getDarkModeFromLocalStorage = () => {
  const darkMode = localStorage.getItem("darkMode");
  return darkMode ? JSON.parse(darkMode) : true;
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    isDarkMode: getDarkModeFromLocalStorage(),
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    toggleDarkMode: (state) => {
      localStorage.setItem("darkMode", JSON.stringify(!state.isDarkMode));
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { startLoading, stopLoading, toggleDarkMode } = uiSlice.actions;
