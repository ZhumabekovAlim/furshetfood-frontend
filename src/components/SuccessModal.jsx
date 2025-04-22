import React from "react";
import "../styles/SignIn.css";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayModal } from "../features/cartSlice";
import SuccessfullyLoggedIn from "/Icons/successfullyLoggedIn.svg";

function SuccessModal() {
  const dispatch = useDispatch();
  const { displayModal } = useSelector((state) => state.cart);

  if (!displayModal) return null;
  return (
    <div className="signIn_wrapper">
      <div className="signIn_inner" style={{ top: "0" }}>
        <div className="signIn_modal_container">
          <h2 className="signIn_title">Поздравляю!</h2>
          <p className="signIn_description">
            Вы сделали заказ ожидайте звонка.
          </p>

          <div className="code-container" style={{ margin: "25px 0 0 0" }}>
            <img src={SuccessfullyLoggedIn} alt="" />
          </div>
        </div>

        <div
          className="signIn_Closebutton"
          onClick={() => dispatch(setDisplayModal(false))}
        >
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
      </div>
    </div>
  );
}

export default SuccessModal;
