import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface AuthState {
  token: string | null;
  tokenWs: string | null;
  isLogin: boolean;
  role: string | null;
  permissionList: {} | null;
}

const initialState: AuthState = {
  token: null,
  tokenWs: null,
  isLogin: false,
  role: null,
  permissionList: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action?.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
      state.tokenWs = null;
    },
    setStateLogin: (state, action: { payload: boolean }) => {
      state.isLogin = action?.payload;
    },
    setPermissionList: (state, action: { payload: string }) => {
      state.permissionList = action?.payload;
    },
    setRole: (state, action: { payload: string }) => {
      state.role = action?.payload;
    },
  },
});

export const { setToken, setStateLogin, logout, setPermissionList, setRole } =
  authSlice.actions;
export default authSlice.reducer;
