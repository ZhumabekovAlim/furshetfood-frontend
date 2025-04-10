import React, { useState, useRef, useEffect } from "react";
import "../styles/CodeModal.css";
import SuccessfullyLoggedIn from "/Icons/successfullyLoggedIn.svg";

import axios from "../axios";
import { verifyOtp, cartMerge } from "../constants/URLs";
import {
  validateSessionFunc,
  getUserFunc,
  phoneModal,
  sendPhoneNumber,
} from "../features/authSlice";
import { closeSingInModal } from "../features/singInSlice";
import { useDispatch, useSelector } from "react-redux";

const CodeModal = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const divRefs = useRef([]);

  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [secondsBeforeNewCode, setSecondsBeforeNewCode] = useState(60);

  const userPhone = useSelector((state) => state.auth.userInfo.userphone);

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (/^\d$/.test(key)) {
      const newCode = [...code];
      newCode[index] = key;
      setCode(newCode);
      divRefs.current[index].classList.remove("code-box-unselected");
      divRefs.current[index].classList.add("code-box-selected");

      if (index < code.length - 1) {
        divRefs.current[index + 1]?.focus();
      } else {
        const fullCode = newCode.join("");
        const sendData = {
          phone: userPhone,
          otp: fullCode,
        };
        const verifyCode = async () => {
          try {
            const response = await axios.post(verifyOtp, sendData);
            setSuccess(true);
            setTimeout(() => {
              dispatch(closeSingInModal());
              dispatch(phoneModal());
            }, "2000");
          } catch (error) {
            console.log("Ошибка: ", error);
          }
        };
        verifyCode();
      }
    } else if (key === "Backspace") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      divRefs.current[index].classList.remove("code-box-selected");
      divRefs.current[index].classList.add("code-box-unselected");

      if (index > 0 && newCode[index] === "") {
        divRefs.current[index - 1]?.focus();
      }
    }
  };

  const mergingCarts = async () => {
    try {
      const response = await axios.post(cartMerge);
    } catch (error) {
      console.log("Error while merging carts: ", error);
    }
  };

  const handleClick = () => {
    divRefs.current[code.findIndex((el) => el === "")]?.focus();
  };

  useEffect(() => {
    if (success) {
      dispatch(validateSessionFunc())
        .unwrap()
        .then(() => {
          dispatch(getUserFunc());
          mergingCarts();
        });
    }

    if (secondsBeforeNewCode > 0) {
      const timer = setInterval(() => {
        setSecondsBeforeNewCode((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [success, secondsBeforeNewCode]);

  return (
    <>
      <h2 className="signIn_title">Введите код из смс</h2>
      <p className="signIn_description">{userPhone}</p>
      {!success ? (
        <>
          <div className="code-container">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                ref={(el) => (divRefs.current[index] = el)}
                className="code-box-unselected"
                onChange={(e) => {
                  const key = e.target.value;
                  if (/^\d$/.test(key)) {
                    const newCode = [...code];
                    newCode[index] = key;
                    setCode(newCode);

                    if (index < code.length - 1) {
                      divRefs.current[index + 1]?.focus();
                    } else {
                      const fullCode = newCode.join("");
                      const sendData = {
                        phone: userPhone,
                        otp: fullCode,
                      };
                      const verifyCode = async () => {
                        try {
                          const response = await axios.post(
                            verifyOtp,
                            sendData
                          );
                          setSuccess(true);
                          setTimeout(() => {
                            dispatch(closeSingInModal());
                            dispatch(phoneModal());
                          }, 2000);
                        } catch (error) {
                          console.log("Ошибка: ", error);
                        }
                      };
                      verifyCode();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace") {
                    const newCode = [...code];
                    newCode[index] = "";
                    setCode(newCode);
                    if (index > 0) {
                      divRefs.current[index - 1]?.focus();
                    }
                  }
                }}
              />
            ))}
          </div>

          {secondsBeforeNewCode ? (
            <h6>Получить новый код можно через {secondsBeforeNewCode} сек.</h6>
          ) : (
            <div
              className="send_again"
              onClick={() =>
                dispatch(sendPhoneNumber(userPhone))
                  .unwrap()
                  .then(() => setSecondsBeforeNewCode(60))
              }
            >
              Отправить еще раз!
            </div>
          )}
        </>
      ) : (
        <>
          <div className="code-container">
            <img src={SuccessfullyLoggedIn} alt="" />
          </div>
        </>
      )}
    </>
  );
};

export default CodeModal;
