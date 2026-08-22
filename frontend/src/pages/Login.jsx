import LoginForm from "../Components/auth/LoginForm";
import "../../CSS/login.css";

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>
      <div className="login-glow login-glow-three"></div>

      <div className="login-container">
        <div className="login-left">
          <div className="brand">
            <div className="brand-logo">S</div>
            <span>StudyPilot</span>
          </div>

          <div className="login-content">
            <span className="welcome-badge">Your AI Study Companion</span>

            <h1>
              Study smarter.
              <br />
              <span>Achieve more.</span>
            </h1>

            <p>
              Create personalized study plans, organize your tasks, and track
              your progress with an AI-powered study companion designed around
              you.
            </p>

            {/* <div className="login-features">
              <div className="feature">
                <div className="feature-icon">✦</div>

                <div>
                  <h3>AI-Powered Planning</h3>
                  <p>Build smarter study plans around your goals.</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">✓</div>

                <div>
                  <h3>Stay Organized</h3>
                  <p>Keep your tasks and deadlines in one place.</p>
                </div>
              </div>

              <div className="feature">
                <div className="feature-icon">↗</div>

                <div>
                  <h3>Track Your Progress</h3>
                  <p>See how far you've come and keep moving forward.</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
