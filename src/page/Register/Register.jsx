import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { axiosSecure } from "../../hooks/axiosSecure";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState();
  const navigate = useNavigate();
  const { register: registerStorage } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/register", data);
      if (res.data.token) {
        registerStorage(res.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
    console.log(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-6 sm:py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full sm:w-96">
        <Link to="/">
          <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        </Link>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg mt-2 relative">
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full p-2.5 pr-8 outline-none rounded-lg"
                placeholder="Enter your name"
              />
              <User className="text-gray-400 absolute right-3" />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

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
            value="Register"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <p className="text-sm mt-5 text-center">
            Already have an account? Please{" "}
            <Link to="/login" className="font-bold underline">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
