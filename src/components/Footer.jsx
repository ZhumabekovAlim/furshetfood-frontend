import React from "react";
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer_wrapper">
            <div className="footer_inner">
                <div className="footer_logo">
                    <img src="images/new-logo.svg" alt="" />
                </div>
                <div className="footer_section">
                    <div className="footer_subsections">
                        <div className="footer_wrapper_title">
                            График работы:
                        </div>
                        <div>
                            <div className="work_schedule">
                                Ежедневно 08:00 - 21:00
                            </div>
                            <div className="work_schedule_desc">
                                ИП Джапарова ММ<br />
                                Юр. адрес:<br />
                                ПРОСПЕКТ  Рақымжан <br />
                                Қошқарбаев, 54 А<br />
                                Астана, Алматы<br />
                                Z19X9X3 (010000)
                            </div>
                        </div>
                    </div>
                    <div className="footer_subsections">
                        <div className="footer_wrapper_title">
                            Адрес самовывоза:
                        </div>
                        <div className="center_desc">
                                Астана,<br />
                                Кенен Азербаев 2<br />
                            (Заезд сзади дома)<br />
                        </div>
                    </div>
                    <div className="footer_right">
                        <a href="#">Бонусная система</a>
                        <a href="#" className="filial">Филиалы</a>
                        <a href="https://wa.me/77752456644">Сотрудничество</a>
                    </div>
                </div>
            </div>
            <div className="footer_policy">
                <div className="policy_title">Политика конфиденциальности</div>
                <div className="policy_desc">© 2024 All Rights Reserved by <a href="http://www.nusacorp.com/">Nusa Corporation</a></div>
            </div>
        </footer>
    );
}

export default Footer;