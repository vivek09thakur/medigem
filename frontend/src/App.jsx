import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainPage from "./components/MainPage";
import PrivateRoute from "./components/PrivateRoutes";
import About from "./components/atoms/about";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/main"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<LandingPage />} />
        <Route path="/#" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
