import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Vent from "./pages/Home/overlays/Vent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route path="/" element={<Home />}>
              <Route path="vent" element={<Vent />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
