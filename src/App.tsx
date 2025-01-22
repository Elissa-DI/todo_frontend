import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Todos from "./pages/todos";
import Login from "./pages/login";
import Register from "./pages/register";
import { Toaster } from "./components/ui/toaster";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoute><Todos /></ProtectedRoute>} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
