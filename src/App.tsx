import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Reports } from "./pages/Reports";
import Teachers from "./pages/Teachers";
import SelectVote from "./pages/SelectVote";
import Contact from "./pages/Contact";
import Vote from "./pages/Vote";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/selectVote" element={<SelectVote />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/teachers" element={<Teachers />} />
    </Routes>
  );
}

export default App;
