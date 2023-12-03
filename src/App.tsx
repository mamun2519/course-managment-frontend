import "./App.css";
import Login from "./components/auth/Login";
import Reg from "./components/auth/Reg";
import Course from "./components/course/Course";
import Home from "./components/home/Home";
import MainLayout from "./layout/MainLayout";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/course/:id" element={<Course />} />
        {/* <Route
          path="/my-team"
          element={
            <RequireAuth>
              <MyTeam />
            </RequireAuth>
          }
        /> */}
      </Routes>
    </MainLayout>
  );
}

export default App;
