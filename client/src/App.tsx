import {BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import LandingPage from "./components/LandingPage"
import ContactPage from "./components/pages/ContactPage"


const App =() => {
  return(
 <Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/contact" element={<ContactPage />} />
    </Routes> 
 </Router>
  )


}

export default App
