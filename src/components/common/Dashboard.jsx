import React from 'react';
import { useTranslation } from 'contexts/TranslationContext';
import { useUser } from 'contexts/UserContext';
import { useTheme } from 'contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const { language, languages, __, changeLanguage } = useTranslation();
  const { user, logout } = useUser();// || {};
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();
  console.log(user)
  return (
    <>
      <div className="container">
        <h1>{__('Welcome to the admin page!!!')}</h1>
        <div>
          <p>{user ? __('Welcome :name!', { 'name': user.name }) : __('Please log in.')}</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
