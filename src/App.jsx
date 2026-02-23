import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Donor from "./pages/Donor";
import Recipient from "./pages/Recipient";
import Logistics from "./pages/Logistics";
import Admin from "./pages/Admin";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* PROTECTED */}
        <Route
          path="/donor"
          element={
            <ProtectedRoute>
              <Donor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recipient"
          element={
            <ProtectedRoute>
              <Recipient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/logistics"
          element={
            <ProtectedRoute>
              <Logistics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}