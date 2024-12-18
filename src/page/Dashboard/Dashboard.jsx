import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { token } = useAuth();
  console.log(token);

  return (
    <div>
      <h2> Dashboard Page: {} </h2>
    </div>
  );
};

export default Dashboard;
