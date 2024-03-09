import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from "./contexts/UserContext.js";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PublicPageLayout from "./layoutElements/public/PublicPageLayout.jsx";
import AdminPageLayout from "./layoutElements/admin/AdminPageLayout.jsx";
import NoPage from "./components/NoPage";

import adminRoutes from "./routes/adminRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";

function App() {
  const { user } = useUser();
  document.body.classList.add('sb-nav-fixed');

  function checkStaffRoles(user, roles) {

    return true;
  }
  function checkGuest(user, roles) {

    return true;
  }

  return (
    <Routes>
      <Route path="/admin" element={<AdminPageLayout />}  >
        <Route index element={<Dashboard />} />
        {adminRoutes.map((route, index) => (
          checkStaffRoles(user, route.roles) && <Route key={index} path={route.path} element={React.createElement(require(`./components/${route.component}`).default)} />
        ))}
        {user ? <Route path="*" element={<NoPage />} />
          : <Route path="*" element={<Login />} />}
      </Route>
      <Route path="/" element={<PublicPageLayout />}  >
        <Route index element={<Dashboard />} />
        {publicRoutes.map((route, index) => (
          checkGuest(user, route.roles) && <Route key={index} path={route.path} element={React.createElement(require(`./components/${route.component}`).default)} />
        ))}
        {user ? <Route path="*" element={<NoPage />} />
          : <Route path="*" element={<Login />} />}
      </Route>
    </Routes>
  );
}

export default App;
        // {!user && <Route path="admin/login" element={<Login />} />}
        // {user && <Route path="profile" element={<Profile />} />}
        // {user && <Route path="logout" element={<Logout />} />}
        // {!user && <Route path="register" element={<Register />} />}
        // {user ? <Route path="*" element={<NoPage />} />
        //   : <Route path="*" element={<Login />} />}