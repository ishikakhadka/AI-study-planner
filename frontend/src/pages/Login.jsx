import LoginForm from "../Components/auth/LoginForm";

export default function Login() {
  return (
    <div className="login">
      <div className="login-left">
        <h1>Study Smarter with AI</h1>

        <p>
          Personalized study plans, intelligent scheduling, and progress
          tracking—all in one place to help you reach your academic goals.
        </p>
      </div>

      <div className="login-right">
        <LoginForm />
      </div>
    </div>
  );
}
