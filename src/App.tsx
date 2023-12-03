import "./App.css";
import Login from "./components/auth/Login";
import Reg from "./components/auth/Reg";
import RequireAuth from "./components/auth/RequreAtuh";
import Course from "./components/course/Course";
import Home from "./components/home/Home";
import MainLayout from "./layout/MainLayout";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/dashboard/Dashboard";
function App() {
  return (
    <MainLayout>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reg />} />
        <Route
          path="/course/:id"
          element={
            <RequireAuth>
              <Course />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
