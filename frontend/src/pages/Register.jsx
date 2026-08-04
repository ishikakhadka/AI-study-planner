import RegisterForm from "../Components/auth/RegisterForm";

const Register = () => {
  return (
    <div className=" body min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-6xl px-8">
        <div className="w-1/2">
          <h1 className="title">Welcome to StudyMate!</h1>
        </div>

        <div className="w-1/2 flex justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
