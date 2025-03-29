import React, { useEffect, useState } from "react";
import axios from "../axios";
import SetHedaerSkeleton from "./SetHedaerSkeleton";
import '../styles/SetHeader.css'

const SetHeader = (props) => {
  const [menuHeader, setMenuHeader] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(props.url).then((response) => {
      // Фильтруем лишнюю категорию, если нужно
      const filtered = response.data.filter((item) => item.name !== "Другое");
      setMenuHeader(filtered);
      setLoading(false);
      // Если передан callback, передаём данные наверх
      if (props.onData) props.onData(filtered);
    });
  }, [props.url, props.onData]);

  if (loading) return <SetHedaerSkeleton categoryCount={11} />;

  return (
    <>
        {loading && <SetHedaerSkeleton categoryCount={11} />}
      {menuHeader.map((item) => (
        <div className="menuHeader" key={item.id}>
          <div className="menu_title">{item.name}</div>
        </div>
      ))}
    </>
  );
};

export default SetHeader;
