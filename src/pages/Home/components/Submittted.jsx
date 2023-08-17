import { Link } from "react-router-dom"
import { Close, Verified } from "../../../assets"
import "./Submitted.css"

const Submitted = () => {
  return (
    <div className="submitted__card">
      <Link to={"/"} replace className="close__icon">
        <Close />
      </Link>
      <h3>Submitted</h3>
      <Verified />
      <p>You will get a mail soon</p>
    </div>
  )
}

export default Submitted;