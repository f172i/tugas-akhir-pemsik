// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Mahasiswa from "./pages/auth/admin/Mahasiswa";
import Dashboard from "./pages/auth/admin/Dashboard";
import ProtectedRoute from "./protect/protectRoute.jsx"; // Impor ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mahasiswa"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Mahasiswa />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
