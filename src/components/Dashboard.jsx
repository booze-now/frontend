import React from 'react';
import { useTranslation } from '../contexts/TranslationContext';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { language, languages, __, changeLanguage } = useTranslation();
  const { user, login, logout } = useUser();// || {};
  const { toggleTheme } = useTheme();
  return (
    <>
      <div className="container">
        <h1>{__('Context API Sample app with user, translation, and theme handling')}</h1>
        {Object.keys(languages).map((e, i) => {
          return e !== language && <button className="btn btn-sm btn-primary" key={i} onClick={() => { changeLanguage(e) }}>{__('Change language to :lang', { lang: __(languages[e]) })}</button>
        })}{" "}
        <button className="btn btn-sm btn-info" onClick={user ? logout : () => login({ 'username': 'Joe', 'age': 12, 'gender': __('male') })}>{user ? __('Logout') : __('Login')}</button>{" "}
        <button className="btn btn-sm btn-info" onClick={toggleTheme}>{__('Toggle Theme')}</button>
        <div>
          <p>{user ? __('Welcome :name!', { 'name': user.name }) : __('Please log in.')}</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
