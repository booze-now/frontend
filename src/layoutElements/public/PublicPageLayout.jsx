import React, { useEffect } from "react";
import TopNav from "./TopNav.jsx";
import ContentArea from "../ContentArea.jsx";
import { useConfig } from "../../contexts/ConfigContext.js";
import './layout.css';

const PublicPageLayout = () => {
  const { applyGuestRealm } = useConfig();

  useEffect(() => applyGuestRealm())

  return (
    <>
      <TopNav />
      <div id="layoutSidenav">
        <div id="layoutSidenav_content">
          <ContentArea />
        </div>
      </div>
    </>
  );
};

export default PublicPageLayout;
