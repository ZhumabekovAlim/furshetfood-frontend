import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer_wrapper">
      <div className="footer_inner">
        <div className="footer_logo">
          <img src="images/new-logo.svg" alt="" />
        </div>
        <div className="footer_section">
          <div className="footer_subsections">
            <div className="footer_wrapper_title">График работы:</div>
            <div>
              <div className="work_schedule">Сервис доставки еды в Астане</div>
              <div className="work_schedule">Ежедневно 08:00 - 00:00</div>
              <a
                href="/public_offer"
                target="_blank"
                rel="noopener noreferrer"
                className="work_schedule"
                style={{ display: "block", textDecoration: "underline" }}
              >
                Публичная оферта
              </a>
              <a
                href="/privacy_policy"
                target="_blank"
                rel="noopener noreferrer"
                className="work_schedule"
                style={{ display: "block", textDecoration: "underline" }}
              >
                Политика конфиденциальности
              </a>
            </div>
          </div>
          <div className="footer_subsections">
            <div className="footer_wrapper_title">Адрес самовывоза:</div>
            <p className="city">Астана</p>
            <ul style={{ marginTop: "0", paddingLeft: "0" }}>
              <li>
                <a
                  href="https://go.2gis.com/9fyzJ"
                  style={{
                    color: "#000",
                    fontWeight: "400",
                    textAlign: "left",
                  }}
                  className="center_desc"
                >
                  Кошкарбаева 54а
                </a>
              </li>
            </ul>
          </div>
          <div className="footer_subsections">
            <div className="footer_wrapper_title">Телефоны:</div>
            <div>
              <a
                href="tel:+77076496622"
                className="work_schedule"
                style={{ display: "block", color: "inherit" }}
              >
                +7 707 649 6622
              </a>
              <a
                href="tel:+77786496622"
                className="work_schedule"
                style={{ display: "block", color: "inherit" }}
              >
                +7 778 649 6622
              </a>
            </div>
          </div>
          <div className="footer_right">
            <a href="#">Бонусная система</a>
            <a href="https://wa.me/77752456644">Сотрудничество</a>
          </div>
        </div>
      </div>
      <div className="footer_policy">
        {/* <div className="policy_title">Политика конфиденциальности</div> */}
        <div className="policy_desc">
          © 2025 All Rights Reserved by{" "}
          <a href="http://www.nusacorp.com/">Nusa Corporation</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
