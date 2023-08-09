import { Outlet } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      Home
      <Outlet />
    </div>
  );
};

export default Home;
