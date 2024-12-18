import { Route, Routes } from "react-router";
import Main from "../Layout/Main";
import Home from "../page/Home/Home";
import Register from "../page/Register/Register";
import Login from "../page/Login/Login";
import Dashboard from "../page/Dashboard/Dashboard";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
