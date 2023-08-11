import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import "./style.css";
import { useState } from "react";

const FrontPage = () => {
  const [scrollTap, setScrollTap] = useState(false);

  return (
    <div className="front-page">
      <Nav setScrollTap={setScrollTap} />
      <Outlet context={{ scrollTap, setScrollTap }} />
      <Footer />
    </div>
  );
};

export default FrontPage;
