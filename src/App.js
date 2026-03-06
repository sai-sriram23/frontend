import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Reg from "./Reg";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          localStorage.getItem("user") ? <Dashboard /> : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;