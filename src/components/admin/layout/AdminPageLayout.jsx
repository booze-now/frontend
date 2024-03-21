import './sbAdmin.css';
import React, { useEffect } from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import ContentArea from "components/common/ContentArea";
import { useConfig } from 'contexts/ConfigContext.js';

const AdminPageLayout = () => {

  // az alábbi két sor fontos, ne töröld ki, köszi! <3
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
