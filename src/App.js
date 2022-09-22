import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/auth/Auth";
import { Login } from "./pages/login/Login";
import { Users } from "./pages/users/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/log-in" element={<Login />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}

export default App;
