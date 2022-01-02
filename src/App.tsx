import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// styles
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
// pages & components
import { useAuthContext } from "./hooks/useAuthContext";
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import { Project } from "./pages/project/Project";
import { Signup } from "./pages/signup/Signup";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
