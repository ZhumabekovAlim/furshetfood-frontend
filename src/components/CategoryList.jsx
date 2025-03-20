import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import '../styles/CategoryList.css';
import axios from "../axios";
import { cart, cartGuest } from "../constants/URLs";

import { getUserCart, getGuestCart } from '../features/cartSlice';
import { openFood } from "../features/foodInfo";

import { setRandomItems } from "../features/randomExtraItems";

import LoadingModal from "./LoadingModal";
import ProductSkeletonCategory from "./ProductSkeletonCategory";

const CategoryList = (props) => {
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const [menuCategoryItem, setMenuCategoryItem] = useState([]);
    
    useEffect(() => {
        axios.get(props.url)
            .then((response) => {
                console.log('CategoryList: ', response.data);
                setMenuCategoryItem(response.data);
                setFetchingData(false);
                const allItems = response.data.reduce((acc, category) => {
                    return [...acc, ...category.items];
                }, []);

                if (allItems.length) {
                    const randomItems = allItems
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
                alert("Something went wrong while adding the item to the cart. Please try again.");
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
                alert("Something went wrong while adding the item to the cart. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            {loading && <LoadingModal />}
            {fetchingData && <ProductSkeletonCategory categoryCount={4} itemsCount={5} />}
            {menuCategoryItem.map((item) => (
                <div className="category_wrapper" key={item.id}>
                    <h2>{item.name}</h2>
                    <section className="product_category_block">
                        {item.items.map((item) => (
                            <div className="product_item" key={item.id}>
                                <img 
                                    src={item.image_path} 
                                    alt={item.name} 
                                    onClick={() => dispatch(openFood({ foodId: item.id }))}
                                />
                                <div className="product__item_desc_wrapper">
                                    <div className="product_item_info">
                                        <div className="product_item_title">{item.name}</div>
                                        <div className="product_item_desc">{item.weight}</div>
                                    </div>
                                    <div className="product_item_add_to_busket">
                                        <div className="product_item_price">{Math.round(item.discount_price || item.regular_price)} ₸</div>
                                        <button onClick={() => handleAddToCart(item.id, item.item_type)}>
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.8365 1.22165C6.8365 1.03952 6.76415 0.864842 6.63536 0.736053C6.50657 0.607265 6.3319 0.534912 6.14977 0.534912C5.96763 0.534912 5.79296 0.607265 5.66417 0.736053C5.53538 0.864842 5.46303 1.03952 5.46303 1.22165V5.11317H1.5715C1.38937 5.11317 1.2147 5.18553 1.08591 5.31431C0.957118 5.4431 0.884766 5.61778 0.884766 5.79991C0.884766 5.98205 0.957118 6.15672 1.08591 6.28551C1.2147 6.4143 1.38937 6.48665 1.5715 6.48665H5.46303V10.3782C5.46303 10.5603 5.53538 10.735 5.66417 10.8638C5.79296 10.9926 5.96763 11.0649 6.14977 11.0649C6.3319 11.0649 6.50657 10.9926 6.63536 10.8638C6.76415 10.735 6.8365 10.5603 6.8365 10.3782V6.48665H10.728C10.9102 6.48665 11.0848 6.4143 11.2136 6.28551C11.3424 6.15672 11.4148 5.98205 11.4148 5.79991C11.4148 5.61778 11.3424 5.4431 11.2136 5.31431C11.0848 5.18553 10.9102 5.11317 10.728 5.11317H6.8365V1.22165Z" fill="#8B0506"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            ))}
        </>
    );
};

export default CategoryList;