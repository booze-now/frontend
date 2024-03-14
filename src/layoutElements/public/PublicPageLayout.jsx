import React from "react";
import TopNav from "./TopNav.jsx";
import ContentArea from "../ContentArea.jsx";
import { useConfig } from "../../contexts/ConfigContext.js";
import config from "../../models/config.js";
import { useApi } from "../../contexts/ApiContext.js";

const PublicPageLayout = () => {
  const { applyGuestRealm } = useConfig();
  const { updateBaseURL } = useApi();

  updateBaseURL(config.guest.serverUrl);
  applyGuestRealm();
  return (
    <>
      <TopNav />
      <ContentArea />
    </>
  );
};

export default PublicPageLayout;
