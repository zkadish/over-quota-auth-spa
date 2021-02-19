import React from 'react';

import './AuthLayout.scss';

const AuthLayout = props => {
  const { title, message, button, policy, children } = props;

  return (
    <div className="app-wrapper">
      <header className="app-wrapper__header">
        {/* header */}
      </header>
      <main className="app-wrapper__main">
        <div className="auth-form">
          <div className="auth-form__logo">SkillUp</div>
          <div className="auth-form__message">
            <div>{title}</div>
            <div>{message}</div>
          </div>
          {children}
          {policy && (
            <div className="auth-form__policy">
              By clicking <b>"{button}"</b> you're agreeing to our Terms of Service, Privacy Policy and Cookie Policy.
            </div>
          )}
        </div>
      </main>
      <footer className="app-wrapper__footer">
        {/* footer */}
      </footer>
    </div>
  );
};

export default AuthLayout;
