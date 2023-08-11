import { Link } from "react-router-dom";
import { Close } from "../../../assets";
import "./ChatCard.css";

const ChatCard = ({ desc, messagePlaceholder, emailPlaceholder }) => {
  return (
    <div className="chat__card">
      <Link to={"/"} replace className="close__icon">
        <Close />
      </Link>
      <h3>Welcome,</h3>
      <p>{desc}</p>
      <textarea placeholder={messagePlaceholder} />
      {emailPlaceholder && (
        <div className="input__container">
          <input placeholder={emailPlaceholder} />
          <button className="btn">Done</button>
        </div>
      )}
    </div>
  );
};

export default ChatCard;
