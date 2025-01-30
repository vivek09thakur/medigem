import { Link } from "react-router-dom";
import "./styles/LandPageStyle.css";

const LandingPage = () => {
  const Header = () => {
    return (
      <>
        <div className="header">
          <div className="nav">
            <div className="logo">
              <Link to="/">mediGem</Link>
            </div>
            <div className="nav-list">
              <Link to="/product">Product</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/contact">Met Devs</Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const IntroSection = () => {
    return (
      <>
        <div className="intro">
          <h1 className="intro-title">medi<span style={{color:"#6589fffb"}}>Gem</span></h1>
          <h3>medical Gemma</h3>

          <div className="btn-box">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          </div>
          <div className="intro-content">
            </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Header />
      <IntroSection />
    </div>
  );
};

export default LandingPage;
