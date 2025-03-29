import React, { useEffect, useRef } from "react";
import "../styles/Navbar.css";

const StickyNavbar = ({ categories, activeCategory, showNavbar }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const activeElement = containerRef.current.querySelector(".nav-item.active");
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeCategory]);

  const handleNavItemClick = (cat) => {
    const targetElement = document.getElementById(`category-${cat.id}`);
    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 65;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  

  return (
    <div className={`sticky-navbar ${showNavbar ? "sticky-active" : ""}`} ref={containerRef}>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className={`nav-item ${activeCategory === cat.name ? "active menuHeader" : ""}`}
          onClick={() => handleNavItemClick(cat)}
        >
          <div className="menu_item">{cat.name}</div>
        </div>
      ))}
    </div>
  );
};

export default StickyNavbar;
