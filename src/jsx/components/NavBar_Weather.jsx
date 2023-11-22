import React from "react";
import useDayNightMode from '../hooks/useDayNightMode.js'

import {GoSun} from "react-icons/go";
import {IoRainyOutline} from "react-icons/io5";
import {IoIosSnow} from "react-icons/io";

export function NavBar_Weather({selectedWeather, setSelectedWeather}) {
    const {getDayNightColors} = useDayNightMode();

    const handleWeatherIconClick = (weatherIcon) => {
        setSelectedWeather(weatherIcon);
    };

    return (
        <section className='weather'>
            <div className='icons'>
                <GoSun
                    className={`icon icon__${getDayNightColors()} ${
                        selectedWeather === "sun" ? `selected--${getDayNightColors()}` : ""
                    }`}
                    onClick={() => handleWeatherIconClick("sun")}
                />

                <IoRainyOutline
                    className={`icon icon__${getDayNightColors()} ${
                        selectedWeather === "rain" ? `selected--${getDayNightColors()}` : ""
                    }`}
                    onClick={() => handleWeatherIconClick("rain")}
                />

                <IoIosSnow
                    className={`icon icon__${getDayNightColors()} ${
                        selectedWeather === "snow" ? `selected--${getDayNightColors()}` : ""
                    }`}
                    onClick={() => handleWeatherIconClick("snow")}
                />
            </div>
            <p className={`weather__dsc weather__dsc--${getDayNightColors()}`}>Look out the window and choose the
                conditions outside, then decide how you want to spend your time</p>
        </section>
    );
}