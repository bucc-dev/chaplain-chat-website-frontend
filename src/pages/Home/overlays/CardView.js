import { Link, useLocation } from "react-router-dom";
import ChatCard from "../components/ChatCard";
import "./CardView.css";
import { useRef } from "react";
import { frontPageCardData } from "../data/card-data";

const CardView = () => {
  const location = useLocation().pathname.replace("/", "");

  const closeLinkRef = useRef(null);
  const closeOverlay = () => {
    closeLinkRef.current.click();
  };

  const cardData = frontPageCardData[location.toLowerCase()];

  return (
    <div className="home-page__cardview">
      <ChatCard {...cardData} />
      <div className="home-page__cardview__bg" onClick={closeOverlay} />
      <Link hidden to={"/"} ref={closeLinkRef} replace />
    </div>
  );
};

export default CardView;
