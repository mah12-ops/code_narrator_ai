import {BrowserRouter as Router, Routes , Route } from "react-router-dom"
import Dashboard from "./components/pages/Dashboard"
import LandingPage from "./components/pages/LandingPage"
import ContactPage from "./components/pages/ContactPage"
import SignupPage from "./components/Auth/SignUpPage"
import LoginPage from "./components/Auth/LogInPage"
import ResetPasswordPage from "./components/Auth/ResetPasswordPage"
import ForgotPasswordPage from "./components/Auth/ForgotPasswordPage"
import TryNarrator from "./components/pages/Dashboard/Trynarrator"
import HistoryPage from "./components/pages/Dashboard/History"
import SettingsPage from "./components/pages/Dashboard/Setting"
import DocsPage from "./components/pages/Dashboard/Docs"
import ShortcutsPage from "./components/pages/Dashboard/Shortcuts"
import EditProfile from "./components/pages/Dashboard/EditProfilePage"
import { useEffect } from "react"
import { useApp } from "./components/pages/Dashboard/context/AppContext"

const runCode = (code: string) => {
    console.log("Running code:", code);
    // or integrate with your sandbox/terminal executor
  };
const App =() => {
   const { settings, setSettings } = useApp();

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("cn_theme") as "dark" | "light" | null;
    if (savedTheme) {
      setSettings((s) => ({ ...s, theme: savedTheme }));
    }
  }, [setSettings])
  return(
    <div className={settings.theme === "dark" ? "dark" : "light"}>
 <Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
<Route path="/dashboard/*" element={<Dashboard />}>
  <Route path="try-narrator" element={<TryNarrator />} />
  <Route path="history" element={<HistoryPage />} />
  <Route path="settings" element={<SettingsPage />} />
  <Route path="docs" element={<DocsPage runCode={runCode} />} />
  <Route path="shortcuts" element={<ShortcutsPage />} />
    <Route path="edit-profile" element={<EditProfile />} />
</Route>

    </Routes> 
 </Router>

 </div>
  )


}

export default App
