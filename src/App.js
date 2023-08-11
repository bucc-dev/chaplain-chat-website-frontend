import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "./pages/Home";
import Home from "./pages/Home/Home";
import CardView from "./pages/Home/overlays/CardView";
import ErrorPage from "./pages/Error";

function App() {
  return (
    <div className="App">
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
