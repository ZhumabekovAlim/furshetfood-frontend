import React from "react";

import AdvertasmentBanner from "/images/phone.svg";
import WhatsappIcon from "/Icons/whatsapp.svg";
import InstagramIcon from "/Icons/instagram.svg";
import TikTokIcon from "/Icons/tiktok.svg";
import WhatsappButton from "/Icons/logos_whatsapp-icon.svg";

import "../styles/Adverts.css";

function Adverts() {
  return (
    <div className="adverts_wrapper" id="adverts_wrapper">
      <div className="adverts_innerr">
        <div className="adverts_left">
          <img src={AdvertasmentBanner} alt="Рекламный баннер" />
        </div>
        <div className="adverts_right">
          <h1>Мы в соцсетях!</h1>
          <div className="social_media_adverts">
            <div>
              <img
                src={TikTokIcon}
                alt="Кнопка тик тока"
                width={30}
                height={30}
              />
            </div>
            <div>
              <a href="https://instagram.com/furshetfood.kz?igshid=YmMyMTA2M2Y=">
                <img
                  src={InstagramIcon}
                  alt="Кнопка инстаграмма"
                  width={30}
                  height={30}
                />
              </a>
            </div>
            <div>
              <a href="https://wa.me/77786496622">
                <img
                  src={WhatsappIcon}
                  alt="Кнопка ватсапа"
                  width={30}
                  height={30}
                />
              </a>
            </div>
          </div>
          <h2>Для сотрудничества пишите в WhatsApp</h2>
          <a href="https://wa.me/77786496622">
            <button className="whatsapp_btn">
              <img
                src={WhatsappButton}
                alt=""
                style={{ marginRight: "17px" }}
              />
              Связаться<span>&nbsp;с нами</span>
            </button>
          </a>
          <div className="desc">
            <span>Заказы принимаются до 21:00.</span> Доставляем в <br />{" "}
            течение 1,5 часа! Вы можете оплатить заказ <br /> наличными после
            получения, либо переводом через <br /> Kaspi.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adverts;
