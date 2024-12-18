import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Menu, X, CheckSquare } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { token, logout, userName } = useAuth();

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white shadow-lg sticky top-0 z-50"
      >
        <div className="max-w-[98%] mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/")}
            >
              <CheckSquare className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">TodoApp</span>
            </motion.div>
            {userName && (
              <p className="text-gray-500">
                Hello,{" "}
                <span className="font-bold text-gray-500">{userName}</span>
              </p>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.button
                variants={navItemVariants}
                whileHover={{ scale: 1.05 }}
                onClick={token ? handleLogout : handleLogin}
                className="text-gray-600 hover:text-blue-600 font-medium px-6 py-2 rounded-lg shadow-xl border"
              >
                {token ? "Logout" : "Login"}
              </motion.button>
              <motion.button
                variants={navItemVariants}
                whileHover={{ scale: 1.05 }}
                onClick={handleRegister}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-800"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-4">
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onClick={handleLogin}
                className="text-gray-600 w-full hover:text-blue-600 font-medium px-6 py-2 rounded-lg shadow-xl border"
              >
                {token ? "Logout" : "Login"}
              </motion.button>
              <motion.button
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={handleRegister}
                className="bg-blue-600 text-white w-full px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
};

export default Navbar;
