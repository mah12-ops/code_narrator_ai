import {BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import LandingPage from "./components/LandingPage"


const App =() => {
  return(
 <Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    </Routes> 
 </Router>
  )


}

export default App
