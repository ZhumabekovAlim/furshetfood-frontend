import React, { useEffect, useState } from "react";
import axios from "../axios";

import { useDispatch, useSelector } from "react-redux";

import { getGuestCart, getUserCart } from "../features/cartSlice";

import { cart, cartGuest } from "../constants/URLs";

import { foodItems } from "../constants/URLs";
import { MoonLoader } from "react-spinners";

const CartAddedItem = ({ itmeKey, item }) => {
  const dispatch = useDispatch();

  const { item_id, quantity, item_type } = item;

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [detail, setDetail] = useState(null);
  //   const [quantityItem, setQuantityItem] = useState(quantity);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(foodItems)
      .then((response) => {
        const findDetail = response.data.find((item) => item.id === item_id);
        setDetail(findDetail);
      })
      .catch((error) => {
        setError(error);
        console.error("Ошибка при получении данных о товаре:", error);
      })
      .finally(() => setLoading(false));
  }, [item_id]);

  const cartItemPlus = async () => {
    const url = `${isAuthenticated ? cart : cartGuest}/${item_id}`;

    if (isAuthenticated) {
      try {
        const response = await axios.put(url);
        dispatch(getUserCart());
      } catch (error) {
        console.log("Erro while adding item: ", error);
      }
    } else {
      try {
        const response = await axios.put(url);
        dispatch(getGuestCart());
      } catch (error) {
        console.log("Erro while adding item: ", error);
      }
    }
  };

  const cartItemMinus = async () => {
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

  if (loading)
    return (
      <div className="loading">
        <MoonLoader color="#8B0506" size={30} />
      </div>
    );
  if (error) return <div>Ошибка загрузки товара</div>;
  if (!detail) return <div>Данные о товаре не найдены</div>;

  if (detail && detail.name === "Приборы") return null;
  return (
    <div className="cart_added_item" key={itmeKey}>
      <img src={detail.image_path} alt="plov" />
      <div className="cart_item_info">
        <div className="cart_item_top">
          <p className="cart_item_title">{detail.name}</p>
          <div className="cart_item_count">
            <div className="item_count_minus" onClick={() => cartItemMinus()}>
              <svg
                width="14"
                height="3"
                viewBox="0 0 14 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2005 2.70002H1.40049C1.16179 2.70002 0.932875 2.6052 0.764092 2.43642C0.59531 2.26764 0.500488 2.03872 0.500488 1.80002C0.500488 1.56133 0.59531 1.33241 0.764092 1.16363C0.932875 0.994846 1.16179 0.900024 1.40049 0.900024H12.2005C12.4392 0.900024 12.6681 0.994846 12.8369 1.16363C13.0057 1.33241 13.1005 1.56133 13.1005 1.80002C13.1005 2.03872 13.0057 2.26764 12.8369 2.43642C12.6681 2.6052 12.4392 2.70002 12.2005 2.70002Z"
                  fill="#8B0506"
                />
              </svg>
            </div>
            <span>{quantity}</span>
            <div className="item_count_plus" onClick={() => cartItemPlus()}>
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.71363 11.3369C6.71363 11.5393 6.63324 11.7334 6.49014 11.8765C6.34704 12.0196 6.15296 12.1 5.95059 12.1C5.74821 12.1 5.55413 12.0196 5.41103 11.8765C5.26793 11.7334 5.18754 11.5393 5.18754 11.3369V7.01302H0.863629C0.661258 7.01302 0.467175 6.93263 0.324076 6.78953C0.180978 6.64643 0.100586 6.45235 0.100586 6.24998C0.100586 6.0476 0.180978 5.85352 0.324076 5.71042C0.467175 5.56732 0.661258 5.48693 0.863629 5.48693H5.18754V1.16302C5.18754 0.960648 5.26793 0.766563 5.41103 0.623465C5.55413 0.480367 5.74821 0.399976 5.95059 0.399976C6.15296 0.399976 6.34704 0.480367 6.49014 0.623465C6.63324 0.766563 6.71363 0.960648 6.71363 1.16302V5.48693H11.0375C11.2399 5.48693 11.434 5.56732 11.5771 5.71042C11.7202 5.85352 11.8006 6.0476 11.8006 6.24998C11.8006 6.45235 11.7202 6.64643 11.5771 6.78953C11.434 6.93263 11.2399 7.01302 11.0375 7.01302H6.71363V11.3369Z"
                  fill="#8B0506"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="cart_item_desc">
          <div className="cart_item_weight">{detail.weight}</div>
          <div className="cart_item_price">
            {(
              (detail.discount_price || detail.regular_price) * quantity
            ).toFixed(2)}{" "}
            ₸
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartAddedItem;
