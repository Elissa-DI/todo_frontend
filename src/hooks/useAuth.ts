import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { loginSuccess, logout } from "@/store/userSlice";
import { loginUser } from "@/services/authService";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const login = async (email: string, password: string) => {
    console.log("Triggered");
    
    try {
      const data = await loginUser({ email, password });
      console.log("Data ", data);
      
      dispatch(loginSuccess(data.token));
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return { isAuthenticated, login, logoutUser };
};
