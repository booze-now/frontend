import React, { useEffect } from "react";
import TopNav from "components/public/layout/TopNav";
import ContentArea from "components/common/ContentArea";
import { useConfig } from "contexts/ConfigContext";

const PublicPageLayout = () => {
  const { applyGuestRealm } = useConfig();

  useEffect(() => {
    applyGuestRealm()
    import('bootstrap/dist/css/bootstrap.min.css');
  });

  return (
    <>
      <TopNav />
      <ContentArea />
    </>
  );
};

export default PublicPageLayout;
