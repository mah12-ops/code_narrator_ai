import {BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Dashboard from "./components/pages/Dashboard"
import LandingPage from "./components/pages/LandingPage"
import ContactPage from "./components/pages/ContactPage"
import SignupPage from "./components/pages/SignUpPage"
import LoginPage from "./components/pages/LogInPage"


const App =() => {
  return(
 <Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/contact" element={<ContactPage />} />
    </Routes> 
 </Router>
  )


}

export default App
