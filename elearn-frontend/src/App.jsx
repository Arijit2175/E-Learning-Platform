import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./contexts/AuthContext";
import { CoursesProvider } from "./contexts/CoursesContext";
import theme from "./theme";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import FormalLearning from "./pages/FormalLearning";
import NonFormalLearning from "./pages/NonFormalLearning";
import InformalLearning from "./pages/InformalLearning";
import AITutor from "./pages/AITutor";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <CoursesProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/formal" 
                element={
                  <ProtectedRoute>
                    <FormalLearning />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/nonformal" 
                element={
                  <ProtectedRoute>
                    <NonFormalLearning />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/informal" 
                element={
                  <ProtectedRoute>
                    <InformalLearning />
                  </ProtectedRoute>
                } 
              />

              <Route 
                path="/ai" 
                element={
                  <ProtectedRoute>
                    <AITutor />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </CoursesProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
