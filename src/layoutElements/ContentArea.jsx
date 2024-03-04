import React from "react";
import MessageArea from "../components/MessageArea.jsx";
import { Outlet } from "react-router-dom";

const ContentArea = () => {
  return (
    <>
      <div>contentArea</div>
      <MessageArea/>
      <Outlet />
      <div>/contentArea</div>
    </>
  );
};

export default ContentArea;
