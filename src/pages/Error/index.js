import { Link } from "react-router-dom";
import "./style.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oops! Page not found.</h1>
      <br />
      <Link to={"/"} replace>
        <h1>Go to Homepage</h1>
      </Link>
    </div>
  );
};

export default ErrorPage;
