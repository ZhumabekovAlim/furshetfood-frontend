import React, {useState, useEffect} from "react";
import '../styles/SetHeader.css';

import axios from "../axios";
import SetHedaerSkeleton from "./SetHedaerSkeleton";

const SetHeader = (props) => {
    const [menuHeader, setMenuHeader] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(props.url).then((response) => {
            console.log("SetHeader: ", response.data)
            setMenuHeader(response.data);
            setLoading(false);
        })
    }, []);

    return (
        <>
            {loading && <SetHedaerSkeleton categoryCount={11} />}
            {menuHeader.map((item) => {
                if(item.name !== "Другое") {
                    return(
                        <div className="menuHeader" key={item.id}>
                            <div className="menu_title">
                                {item.name}
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )
}

export default SetHeader;
