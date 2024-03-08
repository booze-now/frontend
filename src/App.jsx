import "./App.css";
import './sbAdmin.css';


import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import PageLayout from "./layoutElements/PageLayout";
import NoPage from "./components/NoPage";
import Profile from "./components/Profile";

import { useUser } from "./contexts/UserContext.js";

function App() {
  const { user } = useUser();
  document.body.classList.add('sb-nav-fixed');
  return (

    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Dashboard />} />
        {!user && <Route path="login" element={<Login />} />}
        {user && <Route path="profile" element={<Profile />} />}
        {user && <Route path="logout" element={<Logout />} />}
        {!user && <Route path="register" element={<Register />} />}
        {user ? <Route path="*" element={<NoPage />} />
          : <Route path="*" element={<Login />} />}
      </Route>
    </Routes>
  );
}

export default App;
