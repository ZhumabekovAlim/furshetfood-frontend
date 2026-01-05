import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { setMethod } from "../features/cartSlice";

import "../styles/About.css";
import Skeleton from "react-loading-skeleton";

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);
  const dispatch = useDispatch();

  const { deliveryMethod } = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.auth);

  const getButtonClass = (currentMethod) =>
    `button ${deliveryMethod === currentMethod ? "active" : ""}`;

  const phoneNumber = "+77076496622";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <>
      {isLoading ? (
        <div className="skeleton_wrapper">
          <Skeleton height={91} />
          <Skeleton height={91} />
        </div>
      ) : (
        <div className="buttons_container">
          <div className="delivery_method">
            <h2 className="order_title">Способ доставки</h2>
            <div className="buttons_group">
              <button
                className={getButtonClass("delivery")}
                onClick={() => dispatch(setMethod("delivery"))}
              >
                Доставка
              </button>
              <button
                className={getButtonClass("selfPickUp")}
                onClick={() => dispatch(setMethod("selfPickUp"))}
              >
                Самовывоз
              </button>
              <div
                className="switch_marker"
                style={{ left: deliveryMethod === "selfPickUp" ? "50%" : "0" }}
              ></div>
            </div>
          </div>
          <div className="corporate_order">
            <h2 className="order_title">Корпоративный заказ</h2>
            <a href={isMobile ? `tel:${phoneNumber}` : whatsappLink}>
              <button className="button contact_button">Связаться</button>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
