import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input, Button, Logo } from "../index";
import { useForm } from "react-hook-form";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    try {
      setError("");
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser(session);
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className={`mr-3 w-full max-w-lg p-10 border border-black/10 bg-zinc-300 rounded-xl`}
      >
        <div className="mb-2 flex justify-center">
          <Logo width="100%" />
        </div>
        <h2 className="text-black font-bold text-2xl text-center">
          Sign in to your account
        </h2>
        <p className="text-black/60 mt-2 text-center">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="duration-200 hover:underline hover:text-blue-500 text-center transition-all font-medium"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-5 mt-2">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
                },
              })}
            />
            <Input
              type="password"
              label="Password: "
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full text-white rounded-lg" bgColor="bg-blue-600">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
