
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon">✚</span>
            Medi<span>Connect</span>
          </Link>
          <p>
            Better healthcare starts with the right connection.
            Find doctors, book visits, and stay on top of your care.
          </p>
        </div>

        <div className="footer-links">
          <strong>Explore</strong>
          <Link to="/">Home</Link>
          <Link to="/doctors">Find Doctors</Link>
          <Link to="/dashboard">Patient Dashboard</Link>
        </div>

        <div className="footer-links">
          <strong>Our promise</strong>
          <span>Patient-focused care</span>
          <span>Easy appointment access</span>
          <span>Privacy-conscious design</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MediConnect</span>
        <span>Care that connects. Health that matters.</span>
      </div>
    </footer>
  );
}

export default Footer;
