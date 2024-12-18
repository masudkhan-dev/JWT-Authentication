import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { CheckSquare, Calendar, Bell } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CheckSquare,
      title: "Task Management",
      desc: "Create, organize, and track your tasks efficiently",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Calendar,
      title: "Schedule Planning",
      desc: "Plan your tasks with intuitive calendar views",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      desc: "Never miss a deadline with timely notifications",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div>
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            Organize Your Tasks <br className="hidden sm:block" />
            <span className="text-blue-600">Boost Your Productivity</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Stay organized, focused, and in control with our intuitive task
            management application. Start achieving your goals today.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Get Started Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginClick}
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Feature Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`flex items-center justify-center h-12 w-12 rounded-lg ${feature.bgColor} ${feature.color} mb-4`}
              >
                <feature.icon className="h-6 w-6" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of users who are already managing their tasks
            efficiently
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetStarted}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Create Free Account
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
