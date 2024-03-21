import React, { useEffect } from "react";
import TopNav from "components/public/layout/TopNav";
import ContentArea from "components/common/ContentArea";
import { useConfig } from "contexts/ConfigContext";

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
