import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/Home";
import Home from "./pages/Home/Home";
import CardView from "./pages/Home/overlays/CardView";
import ErrorPage from "./pages/Error";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Routes>
          <Route path="/">
            <Route path="/" element={<FrontPage />}>
              <Route path="/" element={<Home />}>
                <Route path="vent" element={<CardView />} />
                <Route path="prayer-request" element={<CardView />} />
                <Route path="get-response" element={<CardView />} />
                <Route path="book-session" element={<CardView />} />
              </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
