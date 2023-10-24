import { Link } from "react-router-dom";
import { Close } from "../../../assets";
import "./ChatCard.css";
import Submitted from "./Submittted";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChatCard = ({ desc, messagePlaceholder, emailPlaceholder }) => {

  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessage("");
    setEmail("");
  }, []);

  useEffect(() => {
    setSubmitted(false);
  }, [submitted])

  const sendResponse = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      setLoading(true);
      const response = await fetch("https://chaplaincy-backend.onrender.com/api/vents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({message, email})
      })
      const data = await response.json();
      setLoading(false);
      if (/success/i.test(data.status)) {
        toast.success("Submission successful!")
        setSubmitted(true);
        return;
      }
      toast.error("Submission failed")
    } catch (err) {
      setLoading(false);
      toast.error("Submission failed")
    }
  }

  if (!submitted) {
    return (
      <form className="chat__card" onSubmit={sendResponse}>
        <Link to={"/"} replace className="close__icon">
          <Close />
        </Link>
        <h3>Welcome,</h3>
        <p>{desc}</p>
        <textarea 
          required
          autoFocus
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder={messagePlaceholder} />
        {
          emailPlaceholder ? (
            <div className="input__container">
              <input
                required
                value={email} 
                type="email"
                onChange={e => setEmail(e.target.value)}  
                placeholder={emailPlaceholder} />
              <button 
                disabled={loading ? true : false} 
                className="btn">
                  {
                    !loading ? "Done" : "Sending..."
                  }
              </button>
            </div>
          ) : (
            <button 
              disabled={loading ? true : false}
              className="btn vent__btn">
                {
                  !loading ? "Done" : "Sending..."
                }
              </button>
          )
        }
      </form>
    )
  } else {
    return <Submitted />
  }
};

export default ChatCard;
