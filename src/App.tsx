import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// styles
import "./App.css";
import Navbar from "./components/Navbar";
import OnlineUsers from "./components/OnlineUsers";
import Sidebar from "./components/Sidebar";
// pages & components
import { useAuthContext } from "./hooks/useAuthContext";
import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import { Project } from "./pages/project/Project";
import { Signup } from "./pages/signup/Signup";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Dashboard /> : <Navigate replace to="/login" />
                }
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate replace to="/login" />}
              />
              <Route
                path="/projects/:id"
                element={user ? <Project /> : <Navigate replace to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate replace to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate replace to="/" />}
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
