import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/MenuMobile.css";
import { openSingInModal } from "../features/singInSlice";
import {
  openUserProfileModal,
  openOrderHistoryModal,
} from "../features/profileSlice";

import homeIcon from "/Icons/home.svg";
import profileIcon from "/Icons/profile.svg";
import orderIcon from "/Icons/orders.svg";
import phoneIcon from "/Icons/phone.svg";
import instagramIcon from "/Icons/instagram.svg";
import whatsappIcon from "/Icons/whatsapp.svg";
import telephoneIcon from "/Icons/telephone.svg";
import FSign from "/Icons/FSign.svg";
import cashbackIcon from "/Icons/cashback_profileModal.svg";

import ProfileModal from "../components/ProfileModal";

function MenuMobile() {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  const { isOpen } = useSelector((state) => state.profile);

  const toggleMenu = () => {
    setShowMenu((curr) => !curr);
  };

  const profileModal = () => {
    if (isAuthenticated) {
      toggleMenu();
      dispatch(openUserProfileModal());
    } else {
      toggleMenu();
      dispatch(openSingInModal());
    }
  };

  const orderHistory = () => {
    if (isAuthenticated) {
      toggleMenu();
      dispatch(openOrderHistoryModal());
    } else {
      toggleMenu();
      dispatch(openSingInModal());
    }
  };

  const cooperation = () => {
    toggleMenu();
    const element = document.getElementById("adverts_wrapper");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="burger_menu" onClick={() => toggleMenu()}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {showMenu && (
        <div
          className="menu-class-background"
          onTouchStart={() => toggleMenu()}
        ></div>
      )}
      <div
        className="menu_class"
        style={{ transform: showMenu ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="menu_class_wrapper">
          <div className="menu_top">
            <div className="menu_close" onClick={() => toggleMenu()}>
              <span></span>
              <span></span>
            </div>
            <div className="menu_details">
              <div className="menu_user_name">Вы</div>
              <div className="menu_nav">
                <div className="menu_nav_item">
                  <img src={homeIcon} alt="Главная" />
                  <span>Главная</span>
                </div>
                <div
                  className="menu_nav_item"
                  onTouchEnd={() => profileModal()}
                >
                  <img src={profileIcon} alt="Мой профиль" />
                  {isAuthenticated ? (
                    <span>Мой профиль</span>
                  ) : (
                    <span>Войти</span>
                  )}
                </div>
                <div
                  className="menu_nav_item"
                  onTouchEnd={() => orderHistory()}
                >
                  <img src={orderIcon} alt="Мои заказы" />
                  <span>Мои заказы</span>
                </div>
                <div className="menu_nav_item" onTouchEnd={() => cooperation()}>
                  <img src={phoneIcon} alt="Сотрудничество" />
                  <span>Сотрудничество</span>
                </div>
              </div>
              <div className="menu_cashback"></div>
            </div>
          </div>
          {isAuthenticated && (
            <div className="menu_middle">
              {/* <div className="section_menu_middle">
                <span>Кэшбэк</span>
                <img src={cashbackIcon} alt="Кэшбэк" />
              </div> */}
              <div className="menu_middle_line"></div>
              <div className="section_menu_middle">
                <span>Бонусы</span>
                <div className="header__balance">
                  <img src={FSign} alt="Бонусы" />
                  <div className="balance__count">
                    {userInfo.userBonus_points} ₸
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="menu_bottom">
            <div className="adress">Кенен Азербаев 2</div>
            <div className="adress">Кошкарбаева 54а</div>
            <div className="schedule">Ежедневно: 08:00 - 21:00</div>
            <div className="phone">+7 (778) 649 66 22</div>
            <div className="contact_us">
              <a href="">
                <img src={instagramIcon} alt="Иконка инстаграмма" />
              </a>
              <a href="">
                <img src={whatsappIcon} alt="Иконка ватсаппа" />
              </a>
              <a href="">
                <img src={telephoneIcon} alt="Иконка телефона" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="menu_mobile_profile">{isOpen && <ProfileModal />}</div>
    </>
  );
}

export default MenuMobile;
