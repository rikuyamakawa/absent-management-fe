
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import Vote from './Vote'
import { Reports } from "./reports/Reports";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}

export default App
