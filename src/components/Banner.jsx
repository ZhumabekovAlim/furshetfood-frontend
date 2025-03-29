import React, { useState, useRef, useEffect } from "react";

import axios from "../axios";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import Slider from '/images/banner_picture.svg';
import BunnerBtn from '/Icons/banner_btn.svg';

import "../styles/Banner.css";
import { banners } from "../constants/URLs";

const Banner = () => {
  const [slides, setSlides] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(slides.length);
  const [slide, setSlide] = useState(true);
  const setIntervalRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0); 

  const { isLoading } = useSelector((state) => state.auth);

  const nextSlide = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < slides.length) {
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex(0);
    }
  };
  

  const prevSlide = () => {
    setCurrentIndex((currIndex) =>
      currIndex === 0 ? slides.length - 1 : currIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    toggleStateSlide();
  };

  const handleTouchMove = (e) => {
    setEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (startX - endX > 50) {
      nextSlide();
    } else if (endX - startX > 50) {
      prevSlide();
    }
    toggleStateSlide();
  };

  useEffect(() => {
    axios.get(banners)
      .then((response) => {
        setSlides(response.data);
      })
      .catch((e) => console.log("Error while fetching banners img", e));

    if (slide.length) {
      setIntervalRef.current = setInterval(nextSlide, 4500);
    } else {
      clearInterval(setIntervalRef.current);
    }
    return () => clearInterval(setIntervalRef.current); 
  }, [slide])

  const toggleStateSlide = () => {
    setSlide((currStateSlide) => !currStateSlide);
  };


  return (
    <div className="slider">
      {isLoading ? ( <Skeleton height={271}/> ) : (
        <>
          <div className="slider_wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className="slider-btn prev" onClick={prevSlide} onMouseEnter={toggleStateSlide} onMouseLeave={toggleStateSlide}>
              <img src={BunnerBtn} alt="Назад" />
            </div>
            <div className="slides_wrapper">
              <div 
                className="slides"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}  
              >
                {slides.map((item, index) => (
                  <div className="slide" key={index}> 
                    <img src={item.image} alt={item.title} />
                  </div>
                ))}
              </div>
            </div>
            <div className="slider-btn next" onClick={nextSlide}  onMouseEnter={toggleStateSlide} onMouseLeave={toggleStateSlide}>
              <img src={BunnerBtn} alt="Вперед" />
            </div>
          </div>
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;