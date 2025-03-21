import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../styles/CategoryList.css";
import axios from "../axios";
import { cart, cartGuest } from "../constants/URLs";

import { getUserCart, getGuestCart } from "../features/cartSlice";
import { openFood } from "../features/foodInfo";

import { setRandomItems } from "../features/randomExtraItems";

import LoadingModal from "./LoadingModal";
import ProductSkeletonCategory from "./ProductSkeletonCategory";

const CategoryList = (props) => {
  const { items: cartItems } = useSelector((store) => store.cart);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [menuCategoryItem, setMenuCategoryItem] = useState([]);

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        setMenuCategoryItem(response.data);
        setFetchingData(false);
        const allItems = response.data.reduce((acc, category) => {
          return [...acc, ...category.items];
        }, []);

        if (allItems.length) {
            const filteredItems = allItems.filter(item => item.name !== "Приборы");
            const randomItems = filteredItems
              .sort(() => Math.random() - 0.5)
              .slice(0, 3);
            dispatch(setRandomItems(randomItems));
          }          
      })
      .catch((error) => console.log("ERROR caught category list: ", error));
  }, [props.url, dispatch]);

  const handleAddToCart = async (dataId, item_type) => {
    setLoading(true);

    const addItem = {
      item_type: item_type,
      item_id: dataId,
      quantity: 1,
    };

    if (isAuthenticated) {
      try {
        const response = await axios.post(cart, addItem);
        console.log("Success while posting user cart: ", response);
        dispatch(getUserCart());
      } catch (error) {
        console.error("Error adding item to user cart: ", error);
        alert(
          "Something went wrong while adding the item to the cart. Please try again."
        );
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post(cartGuest, addItem);
        console.log("Success while posting guest cart: ", response);
        dispatch(getGuestCart());
      } catch (error) {
        console.error("Error adding item to guest cart: ", error);
        alert(
          "Something went wrong while adding the item to the cart. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  menuCategoryItem && console.log("menuCategoryItem", menuCategoryItem);

  return (
    <>
      {loading && <LoadingModal />}
      {fetchingData && (
        <ProductSkeletonCategory categoryCount={4} itemsCount={5} />
      )}
      {menuCategoryItem.map((item) => {
        if(item.name !== "Другое") {
            return(
                <div className="category_wrapper" key={item.id}>
                  <h2>{item.name}</h2>
                  <section className="product_category_block">
                    {item.items.map((product) => {
                      // Проверяем, есть ли этот товар в корзине
                      const isInCart = cartItems.some(cartItem => cartItem.item_id === product.id);
              
                      return (
                        <div className="product_item" key={product.id}>
                          <img
                            src={product.image_path}
                            alt={product.name}
                            onClick={() => dispatch(openFood({ foodId: product.id }))}
                          />
                          <div className="product__item_desc_wrapper">
                            <div className="product_item_info">
                              <div className="product_item_title">{product.name}</div>
                              <div className="product_item_desc">{product.weight}</div>
                            </div>
                            <div className="product_item_add_to_busket">
                              {isInCart ? (
                                // Если товар в корзине, показываем кнопку обновления
                                <>
                                  <div className="product_item_in_cart">
                                  <button onClick={() => alert("Update cart")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="2" viewBox="0 0 13 2" fill="none">
                                      <path d="M11.9295 1.8H1.12949C0.890797 1.8 0.661879 1.70518 0.493096 1.5364C0.324314 1.36761 0.229492 1.13869 0.229492 0.9C0.229492 0.661305 0.324314 0.432387 0.493096 0.263604C0.661879 0.0948213 0.890797 0 1.12949 0H11.9295C12.1682 0 12.3971 0.0948213 12.5659 0.263604C12.7347 0.432387 12.8295 0.661305 12.8295 0.9C12.8295 1.13869 12.7347 1.36761 12.5659 1.5364C12.3971 1.70518 12.1682 1.8 11.9295 1.8Z" fill="white" />
                                    </svg>
                                  </button>
                                  <span>{cartItems.find(cartItem => cartItem.item_id === product.id).quantity}</span>
                                  <button onClick={() => alert("Update cart")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <path d="M6.84254 10.9369C6.84254 11.1393 6.76214 11.3334 6.61905 11.4765C6.47595 11.6196 6.28186 11.7 6.07949 11.7C5.87712 11.7 5.68304 11.6196 5.53994 11.4765C5.39684 11.3334 5.31645 11.1393 5.31645 10.9369V6.61299H0.992536C0.790164 6.61299 0.596081 6.5326 0.452982 6.3895C0.309884 6.24641 0.229492 6.05232 0.229492 5.84995C0.229492 5.64758 0.309884 5.4535 0.452982 5.3104C0.596081 5.1673 0.790164 5.08691 0.992536 5.08691H5.31645V0.762995C5.31645 0.560623 5.39684 0.366539 5.53994 0.22344C5.68304 0.0803423 5.87712 -4.86374e-05 6.07949 -4.86374e-05C6.28186 -4.86374e-05 6.47595 0.0803423 6.61905 0.22344C6.76214 0.366539 6.84254 0.560623 6.84254 0.762995V5.08691H11.1664C11.3688 5.08691 11.5629 5.1673 11.706 5.3104C11.8491 5.4535 11.9295 5.64758 11.9295 5.84995C11.9295 6.05232 11.8491 6.24641 11.706 6.3895C11.5629 6.5326 11.3688 6.61299 11.1664 6.61299H6.84254V10.9369Z" fill="white" />
                                    </svg>
                                  </button>
                                </div>
                                {
                                  product.discount_price && (
                                      <div className="product_item_price-discount">
                                          {Math.round(product.discount_price)} ₸
                                      </div>
                                  )
                                }
                                </>
                              ) : (
                                // Если товара нет в корзине, показываем кнопку добавления
                                <>
                                  <button onClick={() => handleAddToCart(product.id, product.item_type)} key={product.id}>
                                      <span>{Math.round(product.regular_price)} ₸</span>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                          <path d="M6.8365 1.22165C6.8365 1.03952 6.76415 0.864842 6.63536 0.736053C6.50657 0.607265 6.3319 0.534912 6.14977 0.534912C5.96763 0.534912 5.79296 0.607265 5.66417 0.736053C5.53538 0.864842 5.46303 1.03952 5.46303 1.22165V5.11317H1.5715C1.38937 5.11317 1.2147 5.18553 1.08591 5.31431C0.957118 5.4431 0.884766 5.61778 0.884766 5.79991C0.884766 5.98205 0.957118 6.15672 1.08591 6.28551C1.2147 6.4143 1.38937 6.48665 1.5715 6.48665H5.46303V10.3782C5.46303 10.5603 5.53538 10.735 5.66417 10.8638C5.79296 10.9926 5.96763 11.0649 6.14977 11.0649C6.3319 11.0649 6.50657 10.9926 6.63536 10.8638C6.76415 10.735 6.8365 10.5603 6.8365 10.3782V6.48665H10.728C10.9102 6.48665 11.0848 6.4143 11.2136 6.28551C11.3424 6.15672 11.4148 5.98205 11.4148 5.79991C11.4148 5.61778 11.3424 5.4431 11.2136 5.31431C11.0848 5.18553 10.9102 5.11317 10.728 5.11317H6.8365V1.22165Z" fill="#8B0506" />
                                      </svg>
                                  </button>
                                  {
                                      product.discount_price && (
                                          <div className="product_item_price-discount">
                                              {Math.round(product.discount_price)} ₸
                                          </div>
                                      )
                                  }
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </section>
                </div>
              )
        }
      })}
    </>
  );
};

export default CategoryList;
