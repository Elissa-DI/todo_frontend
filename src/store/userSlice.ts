import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      console.log("Token in slice: ", state.token);      
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
