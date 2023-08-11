import { Link, Outlet, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = ({ setScrollTap }) => {
  const location = useLocation().pathname;

  return (
    <nav className="home-page__nav">
      <Link
        to="/"
        className={`home-page__nav__link ${
          /^\/$|^\/prayer-request$|^\/get-response$|^\/book-session$/i.test(
            location,
          ) && "active"
        }`}
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
      <Link
        to="#chat-section" /* /communicate */
        className="btn home-page__nav__link"
        onClick={() => {
          setScrollTap(true);
        }}
      >
        Talk to the Chaplain
      </Link>
    </nav>
  );
};

export default Nav;
