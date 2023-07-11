import React from "react";
import "../Header/Header.css";

function Header() {
  return (
    <div className="header">
      <h1 className="logo">The Pros</h1>
      <div className="register">
        <h2 className="signUp">Sign Up</h2>
        <h2 className="logIn">Log In</h2>
      </div>
    </div>
  );
}

export default Header;
