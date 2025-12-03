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
              <div className="work_schedule">Ежедневно 08:00 - 21:00</div>
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
                  href="https://go.2gis.com/i11Ep"
                  style={{
                    color: "#000",
                    fontWeight: "400",
                    textAlign: "left",
                  }}
                  className="center_desc"
                >
                  Кенен Азербаев 2 (Заезд сзади дома)
                </a>
              </li>
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
            {/* <div style={{ width: "100px", height: "100px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d504.6206120948882!2d71.50547631512016!3d51.12763915414726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424583cf6e3365a1%3A0x6836b51765cba2a5!2z0YPQuy4g0JrQtdC90LXQvdCwINCQ0LfQtdGA0LHQsNC10LLQsCAy!5e0!3m2!1sru!2skz!4v1744289786471!5m2!1sru!2skz"
                width="200"
                height="100"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}
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
