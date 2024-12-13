import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import Vote from './Vote'
import { Reports } from "./reports/Reports";
import SelectVote from './SelectVote';
import Teachers from './teachers';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/SelectVote" element={<SelectVote reports={[]} />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/teachers" element={<Teachers reports={[]} />} />

    </Routes>
  );
}

export default App
