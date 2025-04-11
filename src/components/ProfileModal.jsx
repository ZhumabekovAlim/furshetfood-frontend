import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { toggleProfile, setProfileWindow } from '../features/profileSlice';
import { logout } from '../features/authSlice';
import { putNewUserInfo } from '../features/authSlice'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMask } from '@react-input/mask';
import * as Yup from 'yup';

import { getUserHistory } from '../features/orderHistory';

import FSign from '/Icons/FSign.svg';
import cashbackIcon from '/Icons/cashback_profileModal.svg';
import profileSectionArrow from '/Icons/profile_section_arrow.svg';
import backBtn from '/Icons/banner_btn.svg';

import '../styles/ProfileModal.css';
import OrderHistoryCardSkeleton from './OrderHistoryCardSkeleton';
import OrderHistoryCard from './OrderHistoryCard';

const ProfileModal = () => {
    const dispatch = useDispatch();

    const {userphone, userName, userBirthday, userEmail, userInstagram} = useSelector((state) => state.auth.userInfo);

    const {isLoading, userHistory, isError} = useSelector((state) => state.orderHistory);

    const {userInfo} = useSelector((state) => state.auth);
    const {currentProfileWindow} = useSelector((state) => state.profile);

    const phoneInputRef = useMask({
        mask: '+7__________',
        replacement: { _: /\d/ },
    });

    const dateOfBirth = useMask({
        mask: '__.__.____ г.',
        replacement: { _: /\d/ },
    })

    const validationSchema = Yup.object().shape({
        userPhone: Yup
            .string()
            .matches(/^\+7\d{10}$/, 'Введите корректный номер телефона')
            .required('Номер телефона обязателен!'),
        userEmail: Yup
            .string()
            .matches(/^(((\.[^<>()\[\]\\.,;:\s@"]+)*[^<>()\[\]\\.,;:\s@"]+)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^$/, 'Введите коректный email!')

    })

    useEffect(() => {
        dispatch(getUserHistory())
    }, [dispatch]);

    return (
        <div className="profile_modal">
            <div className={currentProfileWindow === 0 ? "profile_modal_wrapper1" : "profile_modal_wrapper"}>
                {currentProfileWindow === 0 && (
                    <div className="profile_modal_inner">
                        <div className="profile_modal_header">
                            <div className="ttl_profile_modal">{userInfo.userName === null ? "Вы" : userInfo.userName}</div>
                            <div className="close_profile_modal" onClick={() => dispatch(toggleProfile())}>
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
                        <div className="profile_modal_line"></div>
                        <div className="sections_profile_modal">
                            <span>Кэшбэк</span> 
                            <img src={cashbackIcon} alt="Кэшбэк" />
                        </div>
                        <div className="sections_profile_modal">
                            <span>Баланс</span> 
                            <div className="header__balance">
                                <img src={FSign} alt="" />
                                <div className="balance__count">
                                    {userInfo.userBonus_points} ₸
                                </div>
                            </div>
                        </div>
                        <div className="profile_serction sections_profile_modal" onClick={() => dispatch(setProfileWindow({indexOfPage: 1}))}>
                            <span>Профиль</span> 
                            <img src={profileSectionArrow} alt="стрела" />
                        </div>
                        <div className="profile_serction sections_profile_modal" onClick={() => dispatch(setProfileWindow({indexOfPage: 2}))}>
                            <span>Мои заказы</span> 
                            <img src={profileSectionArrow} alt="стрела" />
                        </div>
                    </div>
                )}
                {currentProfileWindow === 1 && (
                    <div className="profile_modal_userProfile">
                        <div className="profile_modal_userProfile_header">
                            <img src={backBtn} alt="Кнопка назад"  className='profile_back_btn' onClick={() => dispatch(setProfileWindow({indexOfPage: 0}))}/>
                            <span>Мой профиль</span>
                            <div className="close_profile_modal" onClick={() => dispatch(toggleProfile())}>
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
                        <div className="profile_modal_userProfile_body">
                            <Formik
                            initialValues={{ userPhone: userphone || "", userName: userName || "", userDateOfBirth: userBirthday || "", userEmail: userEmail || "", userInstagram: userInstagram || ""}}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    dispatch(putNewUserInfo(values));
                                }}
                            >
                                {({ handleSubmit, setFieldValue}) => (
                                    <Form>
                                        <div className="input_form_field">
                                            <div className="input_hintText">Номер телефона</div>
                                            <Field
                                                name="userPhone"
                                                type="tel"
                                                innerRef={phoneInputRef}
                                                maxLength="20"
                                                className="profile_input"
                                            />
                                            <ErrorMessage
                                                name="userPhone"
                                                component="div"
                                                className="error_message_profile"
                                            />
                                        </div>
                                        <div className="input_form_field">
                                            <div className="input_hintText">Ваше имя</div>
                                            <Field
                                                name="userName"
                                                type="tel"
                                                maxLength="20"
                                                className="profile_input"
                                            />
                                        </div><div className="input_form_field">
                                            <div className="input_hintText">Дата рождения</div>
                                            <Field
                                                name="userDateOfBirth"
                                                type="tel"
                                                innerRef={dateOfBirth}
                                                maxLength="10"
                                                placeholder="дд/мм/гггг"
                                                className="profile_input"
                                            />
                                        </div><div className="input_form_field">
                                            <div className="input_hintText">Электронная почта</div>
                                            <Field
                                                name="userEmail"
                                                type="tel"
                                                className="profile_input"
                                            />
                                            <ErrorMessage
                                                name="userEmail"
                                                component="div"
                                                className="error_message_profile"
                                            />
                                        </div><div className="input_form_field">
                                            <div className="input_hintText">Инстаграм</div>
                                            <Field
                                                name="userInstagram"
                                                type="tel"
                                                maxLength="20"
                                                className="profile_input"
                                            />
                                        </div>
                                        <button
                                            type='submit'
                                            className='profile_save_form_submit'
                                            onClick={handleSubmit}
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            type='submit'
                                            className='profile_delete_form_submit'
                                            onClick={() => dispatch(logout())}
                                        >
                                            Выйти из аккаунт
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}
                {currentProfileWindow === 2 && (
                <div className="profile_modal_userProfile">
                    <div className="profile_modal_userProfile_header">
                        <img src={backBtn} alt="Кнопка назад" className='profile_back_btn'  onClick={() => dispatch(setProfileWindow({indexOfPage: 0}))}/>
                        <span>Мои заказы</span>
                        <div className="close_profile_modal" onClick={() => dispatch(toggleProfile())}>
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
                    <div className="profile_modal_userProfile_body" style={{ overflowY: 'scroll'}}>
                        {isLoading ? <OrderHistoryCardSkeleton cardCount={6}/> : userHistory && <OrderHistoryCard userHistory={userHistory}/>}
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default ProfileModal