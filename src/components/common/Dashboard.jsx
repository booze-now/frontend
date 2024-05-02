import React from "react";
import { useTranslation } from "contexts/TranslationContext";
import { useUser } from "contexts/UserContext";
import { useTheme } from "contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import PieChart from "components/admin/layout/Chart";

const Dashboard = () => {
  const { language, languages, __, changeLanguage } = useTranslation();
  const { user, logout } = useUser(); // || {};
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  //  console.log(user)
  return (
    
    <div className="container">
    <br />
      <PieChart />
    </div>
  );
};

export default Dashboard;
