import React, { useEffect, useState } from "react";
import "../styles/FoodInfoModal.css";

import axios from "../axios";
import { cart, cartGuest } from "../constants/URLs";

import { getUserCart, getGuestCart } from "../features/cartSlice";

import { foodItems } from "../constants/URLs";
import { useDispatch, useSelector } from "react-redux";
import { closeFood, openFood } from "../features/foodInfo";
import LoadingModal from "./LoadingModal";

function FoodInfoModal() {
  const { items: cartItems } = useSelector((store) => store.cart);
  const [dataInfo, setDataInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const item_id = useSelector((state) => state.foodInfo.itemId);

  const moreItems = useSelector((state) => state.randomItems.randomItems);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

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

  const cartItemMinus = async (item_id) => {
    const url = `${isAuthenticated ? cart : cartGuest}/${item_id}`;

    if (isAuthenticated) {
      try {
        const response = await axios.delete(url);
        dispatch(getUserCart());
      } catch (error) {
        console.log("Erro while removing item: ", error);
      }
    } else {
      try {
        const response = await axios.delete(url);
        dispatch(getGuestCart());
      } catch (error) {
        console.log("Erro while removing item: ", error);
      }
    }
  };

  useEffect(() => {
    axios
      .get(foodItems)
      .then((response) => {
        const findDetail = response.data.find((item) => item.id === item_id);
        setDataInfo(findDetail);
      })
      .catch((error) => {
        setError(error);
        console.error("Ошибка при получении данных о товаре:", error);
      })
      .finally(() => setLoading(false));
  }, [item_id]);

  if (loading) return <LoadingModal />;
  if (error) return <div>Ошибка загрузки товара</div>;

  return (
    <div className="food_info">
      <div className="food_info_wrapper">
        <div className="btn_close" onClick={() => dispatch(closeFood())}>
          <svg
            width="37"
            height="36"
            viewBox="0 0 37 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="18.2002" cy="18" r="18" fill="#FAFAFA" />
            <path
              d="M12.8003 12.6L23.6003 23.4M12.8003 23.4L23.6003 12.6"
              stroke="#272727"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <section className="food_info_top">
          <div className="food_info_img">
            <img src={dataInfo.image_path} alt={dataInfo.name} />
          </div>
          <div className="food_info__info">
            <div className="food_info_ttl">{dataInfo.name}</div>
            <div className="food_info_weight">{dataInfo.weight}</div>
            <div className="food_info_desc">{dataInfo.description}</div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              {dataInfo?.discount_price && (
                <span className="product_item_price-discount">
                  {Math.round(dataInfo.regular_price)} ₸
                </span>
              )}
              {dataInfo?.discount_price ? (
                <div className="food_info_price">
                  {Math.round(dataInfo.discount_price)} тг
                </div>
              ) : (
                <div className="food_info_price">
                  {Math.round(dataInfo.regular_price)} тг
                </div>
              )}
            </div>
            {cartItems.some((item) => item.item_id === dataInfo.id) ? (
              <div
                className="button_add_to_basket"
                style={{ justifyContent: "space-between" }}
              >
                <button
                  style={{ backgroundColor: "transparent", cursor: "pointer" }}
                  onClick={() => cartItemMinus(dataInfo.id)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="11.7"
                      cy="11.7"
                      r="11.7"
                      transform="matrix(1 0 0 -1 0 23.3999)"
                      fill="#FAFAFA"
                    />
                    <path
                      d="M17.0999 12.5999H6.2999C6.06121 12.5999 5.83229 12.5051 5.66351 12.3363C5.49472 12.1675 5.3999 11.9386 5.3999 11.6999C5.3999 11.4612 5.49472 11.2323 5.66351 11.0635C5.83229 10.8947 6.06121 10.7999 6.2999 10.7999H17.0999C17.3386 10.7999 17.5675 10.8947 17.7363 11.0635C17.9051 11.2323 17.9999 11.4612 17.9999 11.6999C17.9999 11.9386 17.9051 12.1675 17.7363 12.3363C17.5675 12.5051 17.3386 12.5999 17.0999 12.5999Z"
                      fill="#8B0506"
                    />
                  </svg>
                </button>
                <span>
                  {
                    cartItems.find(
                      (cartItem) => cartItem.item_id === dataInfo.id
                    ).quantity
                  }{" "}
                  x{" "}
                  {Math.round(
                    dataInfo.discount_price || dataInfo.regular_price
                  )}
                </span>
                <button
                  style={{ backgroundColor: "transparent", cursor: "pointer" }}
                  onClick={() =>
                    handleAddToCart(dataInfo.id, dataInfo.item_type)
                  }
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="11.7"
                      cy="11.7"
                      r="11.7"
                      transform="matrix(1 0 0 -1 0 23.3999)"
                      fill="#FAFAFA"
                    />
                    <path
                      d="M12.9133 17.237C12.9133 17.4393 12.8329 17.6334 12.6898 17.7765C12.5467 17.9196 12.3527 18 12.1503 18C11.9479 18 11.7538 17.9196 11.6107 17.7765C11.4676 17.6334 11.3872 17.4393 11.3872 17.237V12.913H7.06334C6.86096 12.913 6.66688 12.8327 6.52378 12.6896C6.38068 12.5465 6.30029 12.3524 6.30029 12.15C6.30029 11.9476 6.38068 11.7535 6.52378 11.6104C6.66688 11.4673 6.86096 11.387 7.06334 11.387H11.3872V7.06304C11.3872 6.86067 11.4676 6.66659 11.6107 6.52349C11.7538 6.38039 11.9479 6.3 12.1503 6.3C12.3527 6.3 12.5467 6.38039 12.6898 6.52349C12.8329 6.66659 12.9133 6.86067 12.9133 7.06304V11.387H17.2372C17.4396 11.387 17.6337 11.4673 17.7768 11.6104C17.9199 11.7535 18.0003 11.9476 18.0003 12.15C18.0003 12.3524 17.9199 12.5465 17.7768 12.6896C17.6337 12.8327 17.4396 12.913 17.2372 12.913H12.9133V17.237Z"
                      fill="#8B0506"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                className="button_add_to_basket"
                onClick={() => handleAddToCart(dataInfo.id, dataInfo.item_type)}
              >
                Добавить в корзину{" "}
              </div>
            )}
          </div>
        </section>

        <section className="food_info_botttom">
          <h2 style={{ marginBottom: 0 }}>Что-то ещё?</h2>
          <div className="food_info_list">
            {moreItems.map((item) => {
              if (item.name !== "Приборы") {
                const isInCart = cartItems.some(
                  (cartItem) => cartItem.item_id === item.id
                );
                return (
                  <div
                    className="product_item"
                    key={item.id}
                    onClick={() => {
                      dispatch(openFood({ foodId: item.id }));
                    }}
                  >
                    <img src={item.image_path} alt={item.name} />
                    <div className="product__item_desc_wrapper">
                      <div className="product_item_info">
                        <div className="product_item_title">{item.name}</div>
                        <div className="product_item_desc">{item.weight}</div>
                        <div className="product_item_desc">
                          {item.description}
                        </div>
                      </div>
                      <div className="product_item_add_to_busket">
                        {isInCart ? (
                          // Если товар в корзине, показываем кнопку обновления
                          <>
                            <div className="product_item_in_cart">
                              <button
                                onClick={() => {
                                  cartItemMinus(item.id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="13"
                                  height="2"
                                  viewBox="0 0 13 2"
                                  fill="none"
                                >
                                  <path
                                    d="M11.9295 1.8H1.12949C0.890797 1.8 0.661879 1.70518 0.493096 1.5364C0.324314 1.36761 0.229492 1.13869 0.229492 0.9C0.229492 0.661305 0.324314 0.432387 0.493096 0.263604C0.661879 0.0948213 0.890797 0 1.12949 0H11.9295C12.1682 0 12.3971 0.0948213 12.5659 0.263604C12.7347 0.432387 12.8295 0.661305 12.8295 0.9C12.8295 1.13869 12.7347 1.36761 12.5659 1.5364C12.3971 1.70518 12.1682 1.8 11.9295 1.8Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              <span>
                                {
                                  cartItems.find(
                                    (cartItem) => cartItem.item_id === item.id
                                  ).quantity
                                }
                              </span>
                              <button
                                onClick={() => {
                                  handleAddToCart(item.id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                >
                                  <path
                                    d="M6.84254 10.9369C6.84254 11.1393 6.76214 11.3334 6.61905 11.4765C6.47595 11.6196 6.28186 11.7 6.07949 11.7C5.87712 11.7 5.68304 11.6196 5.53994 11.4765C5.39684 11.3334 5.31645 11.1393 5.31645 10.9369V6.61299H0.992536C0.790164 6.61299 0.596081 6.5326 0.452982 6.3895C0.309884 6.24641 0.229492 6.05232 0.229492 5.84995C0.229492 5.64758 0.309884 5.4535 0.452982 5.3104C0.596081 5.1673 0.790164 5.08691 0.992536 5.08691H5.31645V0.762995C5.31645 0.560623 5.39684 0.366539 5.53994 0.22344C5.68304 0.0803423 5.87712 -4.86374e-05 6.07949 -4.86374e-05C6.28186 -4.86374e-05 6.47595 0.0803423 6.61905 0.22344C6.76214 0.366539 6.84254 0.560623 6.84254 0.762995V5.08691H11.1664C11.3688 5.08691 11.5629 5.1673 11.706 5.3104C11.8491 5.4535 11.9295 5.64758 11.9295 5.84995C11.9295 6.05232 11.8491 6.24641 11.706 6.3895C11.5629 6.5326 11.3688 6.61299 11.1664 6.61299H6.84254V10.9369Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            </div>
                            {item.discount_price && (
                              <div className="product_item_price-discount">
                                {Math.round(item.regular_price)} ₸
                              </div>
                            )}
                          </>
                        ) : (
                          // Если товара нет в корзине, показываем кнопку добавления
                          <>
                            <button
                              onClick={() =>
                                handleAddToCart(item.id, item.item_type)
                              }
                              key={item.id}
                            >
                              <span>
                                {item.discount_price
                                  ? Math.round(item.discount_price)
                                  : Math.round(item.regular_price)}{" "}
                                ₸
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                              >
                                <path
                                  d="M6.8365 1.22165C6.8365 1.03952 6.76415 0.864842 6.63536 0.736053C6.50657 0.607265 6.3319 0.534912 6.14977 0.534912C5.96763 0.534912 5.79296 0.607265 5.66417 0.736053C5.53538 0.864842 5.46303 1.03952 5.46303 1.22165V5.11317H1.5715C1.38937 5.11317 1.2147 5.18553 1.08591 5.31431C0.957118 5.4431 0.884766 5.61778 0.884766 5.79991C0.884766 5.98205 0.957118 6.15672 1.08591 6.28551C1.2147 6.4143 1.38937 6.48665 1.5715 6.48665H5.46303V10.3782C5.46303 10.5603 5.53538 10.735 5.66417 10.8638C5.79296 10.9926 5.96763 11.0649 6.14977 11.0649C6.3319 11.0649 6.50657 10.9926 6.63536 10.8638C6.76415 10.735 6.8365 10.5603 6.8365 10.3782V6.48665H10.728C10.9102 6.48665 11.0848 6.4143 11.2136 6.28551C11.3424 6.15672 11.4148 5.98205 11.4148 5.79991C11.4148 5.61778 11.3424 5.4431 11.2136 5.31431C11.0848 5.18553 10.9102 5.11317 10.728 5.11317H6.8365V1.22165Z"
                                  fill="#8B0506"
                                />
                              </svg>
                            </button>
                            {item.discount_price && (
                              <div className="product_item_price-discount">
                                {Math.round(item.regular_price)} ₸
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default FoodInfoModal;
