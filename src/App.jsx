// App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import { getUserFunc, validateSessionFunc } from "./features/authSlice";
import { getGuestCart, getUserCart } from "./features/cartSlice";
import PublicOffer from "./pages/PublicOffer";
import axios from "./axios";

function App() {
  const dispatch = useDispatch();

  // Трекинг посещения сайта (один раз за сессию браузера)
  useEffect(() => {
    try {
      let vid = localStorage.getItem("visitor_id");
      if (!vid) {
        vid =
          (window.crypto && window.crypto.randomUUID
            ? window.crypto.randomUUID()
            : String(Date.now()) + Math.random().toString(16).slice(2));
        localStorage.setItem("visitor_id", vid);
      }
      if (!sessionStorage.getItem("visit_tracked")) {
        axios
          .post("/track/visit", { visitor_id: vid, path: window.location.pathname })
          .catch(() => {});
        sessionStorage.setItem("visit_tracked", "1");
      }
    } catch (e) {
      /* ignore tracking errors */
    }
  }, []);

  useEffect(() => {
    const initAuthAndCart = async () => {
      try {
        await dispatch(validateSessionFunc()).unwrap();
        dispatch(getUserFunc());
        dispatch(getUserCart());
      } catch {
        dispatch(getGuestCart());
      }
    };

    initAuthAndCart();
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />

        {/* Страницы политики */}
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/public_offer" element={<PublicOffer />} />

        {/* Любые другие роуты → обратно в Main */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
