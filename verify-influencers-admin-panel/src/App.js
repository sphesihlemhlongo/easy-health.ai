import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import InfluencerDetails from "./pages/InfluencerDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/influencer/:id" element={<InfluencerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

