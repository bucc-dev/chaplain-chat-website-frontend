import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import "./Home.css";
import hugImage from "../../assets/images/hug.png";
import handsImage from "../../assets/images/hands.png";
import joinedHandsImage from "../../assets/images/joined_hands.png";
import careImage from "../../assets/images/care.png";
import { useEffect, useRef } from "react";

const Home = () => {
  const hashLocation = useLocation().hash;
  const chatSectionRef = useRef(null);
  const { scrollTap, setScrollTap } = useOutletContext();

  useEffect(() => {
    if (/^#chat-section$/.test(hashLocation) && chatSectionRef) {
      chatSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setScrollTap(false);
  }, [hashLocation, scrollTap]);

  return (
    <div className="home-page">
      <Outlet />
      <section className="restrict_width home-page__section top__section">
        <div>
          <div className="left">
            <h1>
              Prioritize your <span>Mental Health</span>
            </h1>
            <p>
              You don’t have to control your thoughts, you just have to stop
              letting them control you.
            </p>
            <Link
              className="btn"
              to={"#chat-section"}
              onClick={() => {
                setScrollTap(true);
              }}
            >
              Talk to the Chaplain
            </Link>
          </div>
          <div className="right">
            <div className="image__container">
              <img className="home-page__img" src={handsImage} />
              <img className="home-page__img" src={hugImage} />
            </div>
          </div>
        </div>
      </section>
      <section
        ref={chatSectionRef}
        className="home-page__section bottom__section"
        id="chat-section"
      >
        <h4 className="restrict_width">
          Welcome to BUCC’s Anon chat, what will you like to do today?
        </h4>
        <p className="restrict_width desc__1">
          Speak to someone and let them know what's on your mind. When a problem
          is discussed, its weight is reduced.
        </p>
        <div className="com__container">
          <div className="restrict_width com__content">
            <div className="left">
              <Link className="btn" to={"vent"}>
                Just here to vent
              </Link>
              <Link className="btn" to={"prayer-request"}>
                Drop a prayer request
              </Link>
              <Link className="btn" to={"get-response"}>
                Vent and get a response
              </Link>
              <Link className="btn" to={"book-session"}>
                A one-on-one session with the chaplain
              </Link>
            </div>
            <div className="right">
              <div className="image__container">
                <img className="home-page__img" src={careImage} />
                <img className="home-page__img" src={joinedHandsImage} />
              </div>
            </div>
          </div>
        </div>
        <p className="restrict_width desc__2">
          Please be aware that using this medium for amusing purposes is{" "}
          <span>NOT ALLOWED</span>; it must only be used for serious ones. Your
          wishes and whatever else you say or do will only be addressed to the
          chaplain and no one else. Trust us when we say that this won't be a
          feed where folks can see what you're doing.
        </p>
      </section>
    </div>
  );
};

export default Home;
