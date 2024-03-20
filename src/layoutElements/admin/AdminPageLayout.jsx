import './sbAdmin.css';
import React, { useEffect } from "react";
import TopNav from "./TopNav.jsx";
import SideNav from "./SideNav.jsx";
import ContentArea from "../ContentArea.jsx";
import { useConfig } from '../../contexts/ConfigContext.js';

const AdminPageLayout = () => {
  const { applyStaffRealm } = useConfig();

  useEffect(() => applyStaffRealm())

  return (
    <>
      <TopNav />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav />
        </div>
        <div id="layoutSidenav_content">
          <ContentArea />
        </div>
      </div>
    </>
  );
};

export default AdminPageLayout;
