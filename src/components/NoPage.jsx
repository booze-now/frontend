import React from "react";
import { useTranslation } from "../contexts/TranslationContext.js";
import { Link } from "react-router-dom";

const NoPage = () => {
  const {__} = useTranslation();
  return (
    <>
      <div>404
        <Link to="/login">{__('Log in')}</Link>
      </div>
    </>
  );
};

export default NoPage;
