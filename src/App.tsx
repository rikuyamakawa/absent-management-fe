
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import Vote from './Vote'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/vote" element={<Vote />} />
    </Routes>
  )
}

export default App
