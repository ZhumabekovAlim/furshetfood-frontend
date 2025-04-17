import React, { useState } from "react";
import "../styles/ContactToUs.css";

import ChatIcon from "/Icons/chat.svg";
import OpenSocialMedia from "/Icons/openSocialMedia.svg";
import CloseSocialMedia from "/Icons/closeSocailMedia.svg";
import WhatsappIcon from "/Icons/whatsapp.svg";
import InstagramIcon from "/Icons/instagram.svg";
import TikTokIcon from "/Icons/tiktok.svg";

function ContctToUs() {
  const [open, setOpen] = useState(false);

  return (
    <div className="contact_wrapper">
      <div className="contact_inner">
        <div className="multi_button_social_media">
          <div className="close_social_media" onClick={() => setOpen(!open)}>
            <img
              src={open ? CloseSocialMedia : ChatIcon}
              alt="Кнопка соц. сетей"
            />
          </div>
          <div className="social_media">
            <div
              className={`tiktok_icon_btn social_btn ${
                open ? "open" : "closed"
              }`}
            >
              <a href="https://www.tiktok.com/@furshetfood.kz">
                <img src={TikTokIcon} alt="Кнопка тик тока" />
              </a>
            </div>
            <div
              className={`instagram_icon_btn social_btn ${
                open ? "open" : "closed"
              }`}
            >
              <a href="https://instagram.com/furshetfood.kz?igshid=YmMyMTA2M2Y=">
                <img src={InstagramIcon} alt="Кнопка инстаграмма" />
              </a>
            </div>
            <div
              className={`whatsapp_icon_btn social_btn ${
                open ? "open" : "closed"
              }`}
            >
              <a href="tel:+77786496622">
                <img src={WhatsappIcon} alt="Кнопка ватсапа" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContctToUs;
