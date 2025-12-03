// Main.jsx
import React, { useEffect, useRef, useState } from "react";

import Header from "../components/Header";
import Banner from "../components/Banner";
import About from "../components/About";
import Categories from "../components/Categories"; // если где-то ещё понадобится
import SetHeader from "../components/SetHeader";
import CategoryList from "../components/CategoryList";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import SignIn from "../components/SignInModal";
import ContctToUs from "../components/ContctToUs";
import Adverts from "../components/Adverts";
import { menuItem } from "../constants/URLs";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import { useSelector, useDispatch } from "react-redux";
import { validateSessionFunc, getUserFunc } from "../features/authSlice";
import { getUserCart, getGuestCart } from "../features/cartSlice";
import FoodInfoModal from "../components/FoodInfoModal";
import CartMobileButton from "../components/CartMobileButton";
import Skeleton from "react-loading-skeleton";
import CategoriesSkeleton from "../components/CategoriesSkeleton";
import StickyNavbar from "../components/Navbar";
import Anchor from "../components/Anchor";
import SuccessModal from "../components/SuccessModal";

const Main = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const isSingInOpen = useSelector((state) => state.singIn.isSingInOpen);
  const { isFoodInfoOpen } = useSelector((state) => state.foodInfo);
  const { isLoading } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.profile);

  const [showNavbar, setShowNavbar] = useState(false);
  const [showAnchor, setShowAnchor] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuHeader, setMenuHeader] = useState([]);

  // Управление прокруткой страницы при открытых модальных окнах
  useEffect(() => {
    document.body.style.overflowY = isSingInOpen || isOpen ? "hidden" : "auto";

    return () => {
      // на всякий случай при размонтировании возвращаем дефолт
      document.body.style.overflowY = "auto";
    };
  }, [isSingInOpen, isOpen]);

  // Проверка сессии и получение данных пользователя/корзины
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

  // ref для блока с SetHeader (чипсы)
  const headerRef = useRef(null);

  // Логика показа фиксированного navbar и якоря
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const { top } = headerRef.current.getBoundingClientRect();

      if (top < 0) {
        setShowNavbar(true);
        setShowAnchor(true);
      } else {
        setShowNavbar(false);
        setShowAnchor(false);
      }
    };

    handleScroll(); // проверка при монтировании

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // callback для получения категорий из SetHeader
  const handleSetHeaderData = (data) => {
    setMenuHeader(data || []);
  };

  return (
    <div className="wrapper">
      {/* Корзина пользователя */}
      <Cart />

      <div
        className="common_wrapper"
        style={{ maxWidth: isCartOpen ? "1228px" : undefined }}
      >
        {/* Хэдер */}
        {/* <Header /> */}

        <div className="common">
          {/* Баннеры */}
          <Banner />
          {/* Виды доставки / Корпоративная доставка */}
          <About />

          <div className="category_wrapper">
            {isLoading ? (
              <h2>
                <Skeleton width={250} />
              </h2>
            ) : (
              <h2>Категории</h2>
            )}

            <div className="catalog">
              <div className="set_header_line" ref={headerRef}>
                {/* Компонент "чипсов" с категориями */}
                <SetHeader url={menuItem} onData={handleSetHeaderData} />
              </div>

              <div className="category_list" id="category_list">
                {/* Товары по категориям */}
                <CategoryList
                  url={menuItem}
                  onActiveCategoryChange={setActiveCategory}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Блок сотрудничества */}
        <Adverts />
        {/* Контакты */}
        <ContctToUs />
        {/* Футер */}
        <Footer />
      </div>

      <CartMobileButton />

      {isSingInOpen && <SignIn />}
      {isFoodInfoOpen && <FoodInfoModal />}

      {/* Фиксированный navbar, отображается когда чипсы исчезают */}
      <StickyNavbar
        categories={menuHeader}
        activeCategory={activeCategory}
        showNavbar={showNavbar}
      />

      <Anchor showAnchor={showAnchor} />

      <ToastContainer />
      <SuccessModal />
    </div>
  );
};

export default Main;
