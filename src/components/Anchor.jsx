import React from "react";
import BunnerBtn from "/Icons/Vector.svg";
import "../styles/Anchor.css";

const Anchor = ({ showAnchor }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`anchor-button ${showAnchor ? "show" : ""}`} // Добавляем класс для управления видимостью
      style={{
        opacity: showAnchor ? 1 : 0, // Управление видимостью через inline стиль
        pointerEvents: showAnchor ? "" : "none", // Отключение кликабельности, когда якорь скрыт
      }}
    >
      <img src={BunnerBtn} alt="Якорь" className="anchor" />
    </button>
  );
};

export default Anchor;
