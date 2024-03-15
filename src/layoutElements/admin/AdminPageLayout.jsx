import './sbAdmin.css';
import React from "react";
import TopNav from "./TopNav.jsx";
import SideNav from "./SideNav.jsx";
import ContentArea from "../ContentArea.jsx";

const AdminPageLayout = () => {
  return (
    <>
      <TopNav />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav />
        </div>
        <div id="layoutSidenav_content">
           <div>Admin Page Layout</div> 
          <ContentArea />
        </div>
      </div>
    </>
  );
};

export default AdminPageLayout;
