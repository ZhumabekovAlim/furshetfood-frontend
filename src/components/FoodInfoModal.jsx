import React, { useEffect, useState } from 'react'
import '../styles/FoodInfoModal.css'

import axios from "../axios";
import { cart, cartGuest } from "../constants/URLs";

import { getUserCart, getGuestCart } from '../features/cartSlice';

import { foodItems } from '../constants/URLs';
import { useDispatch, useSelector } from 'react-redux';
import { closeFood } from '../features/foodInfo';
import LoadingModal from './LoadingModal';

function FoodInfoModal() {
    const [dataInfo, setDataInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const item_id = useSelector((state) => state.foodInfo.itemId)

    const moreItems = useSelector((state) => state.randomItems.randomItems)
    
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();

    const handleAddToCart = async (dataId, item_type) => {
        setLoading(true);
        
        const addItem = {
            item_type: item_type,
            item_id: dataId,
            quantity: 1,
        }
        
        if (isAuthenticated) {
            try {
                const response = await axios.post(cart, addItem);
                console.log("Success while posting user cart: ", response);
                dispatch(getUserCart());
            } catch (error) {
                console.error("Error adding item to user cart: ", error);
                alert("Something went wrong while adding the item to the cart. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const response = await axios.post(cartGuest, addItem);
                console.log("Success while posting geust cart: ", response)
                dispatch(getGuestCart());
            } catch (error) {
                console.error("Error adding item to guest cart: ", error);
                alert("Something went wrong while adding the item to the cart. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        axios.get(foodItems).then((response) => {
            const findDetail = response.data.find((item) => item.id === item_id);
            setDataInfo(findDetail);
        }).catch((error) => {
            setError(error);
            console.error("Ошибка при получении данных о товаре:", error);
        }).finally(() => setLoading(false));
    }, [item_id])

    
    if (loading) return <LoadingModal/>;
    if (error) return <div>Ошибка загрузки товара</div>;

    return (
        <div className="food_info">
            <div className="food_info_wrapper">
                <div className="btn_close" onClick={() => dispatch(closeFood())}>
                    <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18.2002" cy="18" r="18" fill="#FAFAFA"/>
                        <path d="M12.8003 12.6L23.6003 23.4M12.8003 23.4L23.6003 12.6" stroke="#272727" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <section className="food_info_top">
                    <div className="food_info_img"><img src={dataInfo.image_path} alt={dataInfo.name}/></div>
                    <div className="food_info__info">
                        <div className="food_info_ttl">{dataInfo.name}</div>
                        <div className="food_info_weight">{dataInfo.weight}</div>
                        <div className="food_info_desc">{dataInfo.description}</div>
                        <div className="food_info_price">{dataInfo.price} тг</div>
                        <div className="button_add_to_basket" onClick={() => handleAddToCart(dataInfo.id, dataInfo.item_type)}>Добавить в корзину </div>
                    </div>
                </section>
                <section className="food_info_botttom">
                    <h2>Что-то ещё?</h2>
                    <div className="food_info_list">
                        {moreItems.map((item) => (
                            <div className="product_item" key={item.id}>
                                <img 
                                    src={item.image_path} 
                                    alt={item.name} 
                                />
                                <div className="product__item_desc_wrapper">
                                    <div className="product_item_info">
                                        <div className="product_item_title">{item.name}</div>
                                        <div className="product_item_desc">{item.description}</div>
                                    </div>
                                    <div className="product_item_add_to_busket">
                                        <div className="product_item_price">{Math.round(item.price)} ₸</div>
                                        <button onClick={() => handleAddToCart(item.id)}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.8365 1.22165C6.8365 1.03952 6.76415 0.864842 6.63536 0.736053C6.50657 0.607265 6.3319 0.534912 6.14977 0.534912C5.96763 0.534912 5.79296 0.607265 5.66417 0.736053C5.53538 0.864842 5.46303 1.03952 5.46303 1.22165V5.11317H1.5715C1.38937 5.11317 1.2147 5.18553 1.08591 5.31431C0.957118 5.4431 0.884766 5.61778 0.884766 5.79991C0.884766 5.98205 0.957118 6.15672 1.08591 6.28551C1.2147 6.4143 1.38937 6.48665 1.5715 6.48665H5.46303V10.3782C5.46303 10.5603 5.53538 10.735 5.66417 10.8638C5.79296 10.9926 5.96763 11.0649 6.14977 11.0649C6.3319 11.0649 6.50657 10.9926 6.63536 10.8638C6.76415 10.735 6.8365 10.5603 6.8365 10.3782V6.48665H10.728C10.9102 6.48665 11.0848 6.4143 11.2136 6.28551C11.3424 6.15672 11.4148 5.98205 11.4148 5.79991C11.4148 5.61778 11.3424 5.4431 11.2136 5.31431C11.0848 5.18553 10.9102 5.11317 10.728 5.11317H6.8365V1.22165Z" fill="#8B0506"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FoodInfoModal