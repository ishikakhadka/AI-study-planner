import { BookOpenText, CheckCheck, Clock } from "lucide-react";
import "../../../../CSS/createplan.css";
import { useNavigate } from "react-router";
const CreatePlan = () => {
  const navigate = useNavigate();

  return (
    <section className="create-plan">
      <div className="create-plan-content">
        <p className="create-plan-label">YOUR STUDY JOURNEY</p>

        <h2>
          Thanks for trusting
          <span className="study"> Study</span>
          <span className="pilot">Pilot</span>
        </h2>

        <p className="create-plan-description">
          Ready to study smarter? Create a personalized study plan based on your
          goals, subjects, and available time.
        </p>

        <button
          className="create-plan-btn"
          onClick={() => {
            navigate("/study-plan/create");
          }}>
          + Create Study Plan
        </button>
      </div>

      <div className="create-plan-visual">
        <div className="floating-card card-one">
          <span>
            {" "}
            <BookOpenText />
          </span>
          <div>
            <strong>Study Goals</strong>
            <small>Stay focused</small>
          </div>
        </div>

        <div className="floating-card card-two">
          <span>
            {" "}
            <Clock />
          </span>
          <div>
            <strong>Smart Time</strong>
            <small>Plan efficiently</small>
          </div>
        </div>

        <div className="floating-card card-three">
          <span>
            <CheckCheck />
          </span>
          <div>
            <strong>Progress</strong>
            <small>Keep improving</small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePlan;
