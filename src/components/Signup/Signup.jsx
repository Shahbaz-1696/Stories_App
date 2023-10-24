import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../appwrite/auth";
import { Input, Button, Logo } from "../index";
import { login } from "../../store/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    try {
      setError("");
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser(session);
        if (userData) dispatch(login(userData));
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
          Create a new account
        </h2>
        <p className="text-black/60 mt-2 text-center">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="duration-200 hover:underline hover:text-blue-500 text-center transition-all font-medium"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-8">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5 mt-2">
                <Input
                type="text"
                placeholder="Enter your name"
                label="Full Name: "
                {...register("name", {
                    required: true,
                })}
                />
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
            label="Password: "
            placeholder="Enter your password"
            type="password"
            {...register("password", {
                required: true,
            })}
            />
            <Button className="w-full rounded-lg text-white" type="submit" bgColor="bg-blue-600">Create Account</Button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
