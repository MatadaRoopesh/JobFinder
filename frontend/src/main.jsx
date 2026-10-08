import React from "react";
import {
  createRoot
} from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import "./styles.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Saved from "./pages/Saved";
import Applications from "./pages/Applications";
import About from "./pages/About";


function Private({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
}


function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Authentication */}
        <Route
          path="/login"
          element={<Auth mode="login" />}
        />

        <Route
          path="/register"
          element={<Auth mode="register" />}
        />

        {/* Public About Page */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />

        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />

        <Route
          path="/saved"
          element={
            <Private>
              <Saved />
            </Private>
          }
        />

        <Route
          path="/applications"
          element={
            <Private>
              <Applications />
            </Private>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);