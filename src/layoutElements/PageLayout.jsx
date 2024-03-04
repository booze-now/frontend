import React from "react";
import TopNav from "./TopNav.jsx";
import SideNav from "./SideNav.jsx";
import ContentArea from "./ContentArea.jsx";

const PageLayout = () => {
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

export default PageLayout;
