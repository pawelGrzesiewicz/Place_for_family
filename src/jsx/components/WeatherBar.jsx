import React, {useState} from "react";
import {NavLink, Route} from "react-router-dom";
import useDayNightMode from '../hooks/useDayNightMode.js'

import {GoSun} from "react-icons/go";
import {IoRainyOutline} from "react-icons/io5";
import {IoIosSnow} from "react-icons/io";
// import SunComponent from "./SunComponent";
// import RainComponent from "./RainComponent";
// import SnowComponent from "./SnowComponent";

export function WeatherBar() {
    const {getDayNightColors} = useDayNightMode();
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleIconClick = (icon) => {
        setSelectedIcon(icon);
    };

    return (
        <section className='weather'>
            <div className='icons'>
                    <GoSun
                        className={`icon icon__${getDayNightColors()} ${
                        selectedIcon === "sun" ? `selected--${getDayNightColors()}` : ""
                        }`}
                        onClick={() => handleIconClick("sun")}
                    />

                    <IoRainyOutline
                        className={`icon icon__${getDayNightColors()} ${
                        selectedIcon === "rain" ? `selected--${getDayNightColors()}` : ""
                        }`}
                        onClick={() => handleIconClick("rain")}
                    />

                    <IoIosSnow
                        className={`icon icon__${getDayNightColors()} ${
                            selectedIcon === "snow" ? `selected--${getDayNightColors()}` : ""
                        }`}
                        onClick={() => handleIconClick("snow")}
                    />
            </div>
            <p className={`weather__dsc weather__dsc--${getDayNightColors()}`}>Look out the window and choose the conditions outside, then decide how you want to spend your time</p>
        </section>
    );
}