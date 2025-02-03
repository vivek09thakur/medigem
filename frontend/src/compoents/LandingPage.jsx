import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useState, memo } from "react";
import About from "./atoms/about";
import "./styles/LandPageStyle.css";

const Header = memo(({ isOpen, toggleMenu }) => (
  <div className="header">
    <div className="nav">
      <div className="logo">
        <HashLink to="/#" style={{ color: "var(--accent-color)" }}>
          mediGem
        </HashLink>
      </div>
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`nav-list ${isOpen ? "active" : ""}`}>
        <div className="close-btn" onClick={toggleMenu}>
          ×
        </div>
        <HashLink to="/#about">About</HashLink>
        <HashLink to="/#contact">Contact</HashLink>
        <HashLink to="/#team">Meet Devs</HashLink>
      </div>
    </div>
  </div>
));

const IntroSection = memo(() => (
  <div className="intro">
    <h1 className="intro-title">
      <span style={{ color: "var(--accent-color)" }}>mediGem</span>
    </h1>
    <h3 style={{ color: "var(--text-primary)" }}>Your Partner in Health</h3>
    <div className="btn-box">
      <Link
        to="/login"
        style={{
          backgroundColor: "var(--accent-color)",
          color: "#000000",
          transition: "all 0.3s ease-in-out",
        }}
      >
        Login
      </Link>
      <Link
        to="/signup"
        style={{
          backgroundColor: "var(--accent-color)",
          color: "#000000",
          transition: "all 0.3s ease-in-out",
        }}
      >
        Sign Up
      </Link>
    </div>
    <div className="intro-content">
      <p style={{ color: "var(--text-primary)" }}>
        Welcome to mediGem, your AI-powered healthcare platform. Manage your
        health records, appointments, and provider communications with our
        advanced AI technology.
      </p>
    </div>
  </div>
));




const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="landing-container"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <IntroSection />
      <About />
    </div>
  );
};

export default memo(LandingPage);