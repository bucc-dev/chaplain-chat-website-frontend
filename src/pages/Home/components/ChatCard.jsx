import { Link } from "react-router-dom";
import { Close } from "../../../assets";
import "./ChatCard.css";
import Submitted from "./Submittted";
import { useState } from "react";

const ChatCard = ({ desc, messagePlaceholder, emailPlaceholder }) => {

  const [submitted, setSubmitted] = useState(false);
  const sendResponse = () => {
    setSubmitted(true);
  }

  if (!submitted) {
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
            <button className="btn" onClick={sendResponse}>Done</button>
          </div>
        )}
      </div>
    )
  } else {
    return <Submitted />
  }
};

export default ChatCard;
