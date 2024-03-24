import "./sbAdmin.css";
import React, { useEffect } from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import ContentArea from "components/common/ContentArea";
import { useConfig } from "contexts/ConfigContext.js";

const AdminPageLayout = () => {
  // az alábbi két sor fontos, ne töröld ki, köszi! <3
  const { applyStaffRealm } = useConfig();
  useEffect(() => applyStaffRealm());

  return (
    <>
      <TopNav />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <SideNav />
        </div>
        <div id="layoutSidenav_content">
          <ContentArea />
          <footer>
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div>Copyright &copy; Your Website 2023</div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AdminPageLayout;
