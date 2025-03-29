import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import About from "./components/About";
import Categories from "./components/Categories";
import SetHeader from "./components/SetHeader";
import CategoryList from "./components/CategoryList";
import Footer from './components/Footer';
import Cart from './components/Cart';
import SignIn from './components/SignInModal';
import ContctToUs from "./components/ContctToUs";
import Adverts from "./components/Adverts";
import { menuItem } from "./constants/URLs";
import "./App.css";

import { ToastContainer } from "react-toastify";
import 'react-loading-skeleton/dist/skeleton.css'

import { useSelector, useDispatch } from "react-redux";
import { validateSessionFunc, getUserFunc } from "./features/authSlice";
import { getUserCart, getGuestCart } from './features/cartSlice';
import FoodInfoModal from "./components/FoodInfoModal";
import CartMobileButton from "./components/CartMobileButton";
import Skeleton from "react-loading-skeleton";
import CategoriesSkeleton from "./components/CategoriesSkeleton";
import StickyNavbar from "./components/Navbar";

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const isSingInOpen = useSelector((state) => state.singIn.isSingInOpen);
  const { isFoodInfoOpen } = useSelector((state) => state.foodInfo);
  const { isLoading } = useSelector((state) => state.auth);
  const { isOpen } = useSelector((state) => state.profile);

  // Управление прокруткой страницы при открытых модальных окнах
  isSingInOpen || isOpen
    ? (document.body.style.overflowY = "hidden")
    : (document.body.style.overflowY = "auto");

  const dispatch = useDispatch();

  // Проверка сессии и получение данных пользователя/корзины
  useEffect(() => {
    dispatch(validateSessionFunc())
      .unwrap()
      .then(() => {
        dispatch(getUserFunc());
        dispatch(getUserCart());
      })
      .catch(() => dispatch(getGuestCart()));
  }, [dispatch]);

  // Создаём ref для компонента SetHeader (чипсы)
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
  
      const { top } = headerRef.current.getBoundingClientRect();
  
      // Если пользователь проскроллил вниз и прошел мимо блока категорий (top < 0)
      // Показываем navbar
      setShowNavbar(top < 0);
    };
  
    handleScroll(); // Проверим сразу при монтировании
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  // Предполагаем, что список категорий можно получить из SetHeader.
  // Для примера будем передавать SetHeader как дочерний элемент и получать его данные.
  // Можно использовать глобальное состояние или другой подход.
  const [menuHeader, setMenuHeader] = useState([]);
  // Передадим в SetHeader callback для получения категорий (если необходимо)
  const handleSetHeaderData = (data) => {
    setMenuHeader(data);
  };

  return (
    <div className="wrapper">
      {/* Корзина пользователя */}
      <Cart />
      <div
        className="common_wrapper"
        style={{ maxWidth: isCartOpen ? "1228px" : "" }}
      >
        {/* Хэдер */}
        <Header />
        <div className="common">
          {/* Баннеры */}
          <Banner />
          {/* Виды доставки / Корпоративная доставка */}
          <About />
          <div className="category_wrapper">
            {/* <div className="category_line">
                {isLoading ? <CategoriesSkeleton/> : <Categories/>}
              </div> */}
            {isLoading ? <h2><Skeleton width={250} /></h2> : <h2>Категории</h2>}
            <div className="category_line_wrapper">
            </div>
            <div className="catalog">
              <div className="set_header_line" ref={headerRef}>
                {/* Компонент Чипсов с категориями */}
                <SetHeader url={menuItem} onData={handleSetHeaderData} />
              </div>
              <div className="category_list" id="category_list">
                {/* Компонент, в котором выводятся товары по категориям */}
                <CategoryList url={menuItem} onActiveCategoryChange={setActiveCategory} />
              </div>
            </div>
          </div>
        </div>
        {/* Сотрудничество */}
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
        <StickyNavbar categories={menuHeader} activeCategory={activeCategory} showNavbar={showNavbar} />
      <ToastContainer />
    </div>
  );
}

export default App;
