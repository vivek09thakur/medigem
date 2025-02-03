import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles/LandPageStyle.css";

const LandingPage = () => {
  const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="header">
        <div className="nav">
          <div className="logo">
            <Link to="/" style={{ color: "var(--accent-color)" }}>mediGem</Link>
          </div>
          <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`nav-list ${isOpen ? "active" : ""}`}>
            <div className="close-btn" onClick={toggleMenu}>×</div>
            <Link to="/product">Product</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/contact">Meet Devs</Link>
          </div>
        </div>
      </div>
    );
  };

  const IntroSection = () => {
    return (
      <div className="intro">
        <h1 className="intro-title">
          <span
            style={{
              color: "var(--accent-color)",
            }}
          >
            mediGem
          </span>
        </h1>
        <h3 style={{ color: "var(--text-primary)" }}>Your Partner in Health</h3>
        <div className="btn-box">
          <Link to="/login" style={{ 
            backgroundColor: "var(--accent-color)",
            color: "#000000",
            transition: "all 0.3s ease-in-out"
          }}>Login</Link>
          <Link to="/signup" style={{ 
            backgroundColor: "var(--accent-color)",
            color: "#000000",
            transition: "all 0.3s ease-in-out"
          }}>Sign Up</Link>
        </div>
        <div className="intro-content">
          <p style={{ color: "var(--text-primary)" }}>
            Welcome to mediGem, your AI-powered healthcare platform. Manage your
            health records, appointments, and provider communications with our
            advanced AI technology.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="landing-container" style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <IntroSection />
    </div>
  );
};

export default LandingPage;