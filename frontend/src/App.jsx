import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./compoents/LandingPage";
import Login from "./compoents/Login";
import SignUp from "./compoents/SignUp";
import MainPage from "./compoents/MainPage";
import PrivateRoute from "./compoents/PrivateRoutes";
import About from "./compoents/atoms/about";
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
