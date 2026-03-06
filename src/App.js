import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* We keep /login and /register as redirects to / just in case anyone bookmarked them */}
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Navigate to="/" />} />
        <Route path="/dashboard" element={
          localStorage.getItem("user") ? <Dashboard /> : <Navigate to="/" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;