import "./App.css";
import Home from "./components/home/Home";
import MainLayout from "./layout/MainLayout";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/user/:id" element={<UserDetails />} /> */}
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
