import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { axiosSecure } from "../../hooks/axiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { login, isAuthenticate } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticate()) {
      navigate("/dashboard");
    }
  }, [navigate, isAuthenticate]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/login", data);
      login(res.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(token);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-6 sm:py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full sm:w-96">
        <Link to="/">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-2 relative">
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^[^@]+@[^@]+\.[^@]+$/,
                })}
                className="w-full p-2.5 pr-8 outline-none rounded-lg"
                placeholder="Enter your email"
              />
              <Mail className="text-gray-400 absolute right-3 " />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
                className="w-full p-2.5 pr-10 outline-none rounded-lg"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3"
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400" />
                ) : (
                  <Eye className="text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            value="Login"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-sm mt-5 text-center">
            New Here? Please{" "}
            <Link to="/register" className="font-bold underline">
              Register
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
