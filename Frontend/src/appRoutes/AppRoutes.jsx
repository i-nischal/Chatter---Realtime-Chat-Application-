import { Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Chat from "../pages/chats/Chat";
import getCurrentUser from "../hooks/GetCurrentUser";
import Home from "../pages/Home";

function AppRoutes() {
  getCurrentUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
