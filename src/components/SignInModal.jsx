import React from "react";
import { useMask } from "@react-input/mask";
import "../styles/SignIn.css";

import { closeSingInModal } from "../features/singInSlice";
import { useDispatch, useSelector } from "react-redux";
import { phoneModal, sendPhoneNumber } from "../features/authSlice";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SyncLoader } from "react-spinners";
import CodeModal from "./CodeModal";

function SignInModal() {
  const controller = new AbortController();
  const signal = controller.signal;

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.singIn.isSingInOpen);
  const { sendingPhone, phoneModal, verifyCodeModal } = useSelector(
    (state) => state.auth
  );

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(
        /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
        "Введите корректный номер телефона"
      )
      .required("Номер телефона обязателен!"),
    agreement: Yup.boolean().oneOf([true], "Вы должны согласиться с условиями"),
  });

  const inputRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  });

  return (
    <div className="signIn_wrapper">
      <div className="signIn_inner" style={{ top: isOpen ? "0" : "" }}>
        {verifyCodeModal && (
          <div
            className="back_to_phoneModal"
            onClick={() => {
              dispatch(phoneModal());
            }}
          >
            <svg
              width="36"
              height="37"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16.5951" cy="16.8248" r="15.9547" fill="#FAFAFA" />
              <path
                d="M22.179 17.6225H12.4067L16.5948 21.8106L16.0683 22.4089L10.8831 17.2237L16.0683 12.0384L16.5948 12.6367L12.4067 16.8248H22.179V17.6225Z"
                fill="#272727"
              />
            </svg>
          </div>
        )}
        <div className="signIn_modal_container">
          {phoneModal && (
            <>
              <h2 className="signIn_title">Войти в профиль</h2>
              <p className="signIn_description">
                Укажите номер телефона и выберите способ <br />
                подтверждения
              </p>
              <Formik
                initialValues={{ phone: "+7 ", agreement: false }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  dispatch(
                    sendPhoneNumber(values.phone.replace(/\(|\)|\-|\s/g, ""))
                  );
                }}
              >
                {({ handleSubmit, setFieldValue }) => (
                  <Form className="signIn_form">
                    <div className="signIn_form_input_wrapper">
                      <Field
                        name="phone"
                        innerRef={inputRef}
                        type="tel"
                        maxLength="20"
                        className="form_input"
                        onInput={(e) => {
                          const input = e.target;
                          if (!input.value.startsWith("+7 ")) {
                            input.value =
                              "+7 " + input.value.replace(/^(\+7\s?)/, "");
                          }
                          setFieldValue("phone", input.value);
                        }}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="error_message"
                      />
                    </div>
                    <div className="signIn_agreement_wrapper">
                      <div className="signIn_agreement">
                        <div className="agreement_checkbox">
                          <Field
                            type="checkbox"
                            name="agreement"
                            className="checkbox_input"
                          />
                        </div>
                        <p>
                          Соглашаюсь с{" "}
                          <a href="">
                            условиями сбора и обработки
                            <br /> персональных данных
                          </a>{" "}
                          и <a href="">офертой</a>
                        </p>
                      </div>
                      <ErrorMessage
                        name="agreement"
                        component="div"
                        className="error_message"
                      />
                    </div>
                    <button
                      type="submit"
                      className="signIn_send_button"
                      disabled={sendingPhone ? true : false}
                      style={{
                        cursor: sendingPhone ? "not-allowed" : "pointer",
                      }}
                      onClick={handleSubmit}
                    >
                      {sendingPhone ? (
                        <SyncLoader color="#DEDEDE" />
                      ) : (
                        "Отправить SMS-код"
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </>
          )}

          {verifyCodeModal && <CodeModal />}
        </div>
        <div
          className="signIn_Closebutton"
          onClick={() => dispatch(closeSingInModal())}
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

export default SignInModal;
