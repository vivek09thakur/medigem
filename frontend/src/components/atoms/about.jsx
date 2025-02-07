import "./style.css";

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2>Revolutionizing Healthcare Management</h2>
      <div className="about-content">
        <p>
          mediGem represents the future of healthcare management, combining
          cutting-edge AI technology with intuitive user experience. Our
          platform empowers users to take control of their healthcare journey
          through smart, integrated solutions.
        </p>

        <div className="key-features">
          <h3>Key Features</h3>
          <ul>
            <li>
              AI-Powered Health Insights: Advanced analytics for personalized
              health recommendations
            </li>
            <li>
              Secure Record Management: Encrypted storage for all your medical
              history and documents
            </li>
            <li>
              Smart Appointment System: Seamless scheduling with healthcare
              providers
            </li>
            <li>
              Provider Communication Hub: Direct messaging with your healthcare
              team
            </li>
            <li>
              Intelligent Reminders: Never miss important medications or
              appointments
            </li>
          </ul>
        </div>

        <div className="mission">
          <h3>Our Mission</h3>
          <p>
            We're dedicated to transforming healthcare accessibility by creating
            a bridge between patients and providers through technology. mediGem
            strives to make healthcare management effortless, intelligent, and
            secure for everyone.
          </p>
        </div>

        <div className="technology">
          <h3>Technology at Core</h3>
          <p>
            Built with state-of-the-art AI algorithms and secure infrastructure,
            mediGem ensures your health data is not just stored, but working for
            you. Our platform continuously learns and adapts to provide
            increasingly personalized healthcare management solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
