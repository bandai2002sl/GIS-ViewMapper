// userSlice.ts

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

interface InfoUser {
  role: string;
}

interface UserState {
  infoUser: InfoUser | null;
}

const initialState: UserState = {
  infoUser: null,
};

const persistConfig = {
  key: "user",
  storage,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInfoUser: (state, action: PayloadAction<any>) => {
      state.infoUser = action?.payload;
    },
    updateInfoUser: (state, action: PayloadAction<any>) => {
      state.infoUser = { ...state.infoUser, ...action?.payload };
    },
  },
});

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setInfoUser, updateInfoUser } = userSlice.actions;
export default persistedReducer;
