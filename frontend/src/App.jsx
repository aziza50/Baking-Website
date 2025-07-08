import "./App.css";
import { Home, Layout } from "./pages/";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Home>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Home>
    </Router>
  );
}

export default App;
