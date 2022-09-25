import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Login } from "./pages/login/Login";
import { Users } from "./pages/users/Users";
import { SignUp } from "./pages/signup/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/users/:userId" element={<Users />} />
    </Routes>
  );
}

export default App;
