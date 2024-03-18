import React, { useEffect } from "react";
import TopNav from "./TopNav.jsx";
import ContentArea from "../ContentArea.jsx";
import { useConfig } from "../../contexts/ConfigContext.js";

const PublicPageLayout = () => {
  const { applyGuestRealm } = useConfig();

  useEffect(() => applyGuestRealm())

  return (
    <>
      <TopNav />
      <ContentArea />
    </>
  );
};

export default PublicPageLayout;
