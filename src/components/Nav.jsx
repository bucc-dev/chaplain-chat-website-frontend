import { Link, Outlet } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div>
      <nav className="home-page__nav">
        <Link to="/" className="home-page__nav__link">
          Home
        </Link>
        <Link to="/vent" className="home-page__nav__link">
          Vent
        </Link>
        <Link to="#" /* /contact */ className="home-page__nav__link">
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
