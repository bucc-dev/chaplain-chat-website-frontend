import { Link, Outlet, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const location = useLocation().pathname;

  return (
    <div>
      <nav className="home-page__nav">
        <Link
          to="/"
          className={`home-page__nav__link ${location === "/" && "active"}`}
        >
          Home
        </Link>
        <Link
          to="/vent"
          className={`home-page__nav__link ${location === "/vent" && "active"}`}
        >
          Vent
        </Link>
        <Link
          to="#"
          /* /contact */ className={`home-page__nav__link ${
            location === "/contact" && "active"
          }`}
        >
          Contact
        </Link>
        <Link to="#" /* /communicate */ className="home-page__nav__link">
          Talk to the Chaplain
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Nav;
