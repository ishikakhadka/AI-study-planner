const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">
            Study<span className="pilot">Pilot</span>
          </h2>

          <p>
            Your AI-powered study companion that helps you plan smarter, stay
            organized, and achieve your academic goals.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <a href="/">Home</a>
          <a href="/features">Features</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-links">
          <h4>Resources</h4>

          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Help Center</a>
          <a href="#">FAQs</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Ishika Khadka. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
