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
                <NavLink to="/sun" activeClassName={`active--${getDayNightColors()}`}>
                    <GoSun
                        className={`icon icon__${getDayNightColors()}`}
                        onClick={() => handleIconClick("sun")}
                    />
                </NavLink>
                <NavLink to="/rain" activeClassName={`active--${getDayNightColors()}`}>
                    <IoRainyOutline
                        className={`icon icon__${getDayNightColors()}`}
                        onClick={() => handleIconClick("rain")}
                    />
                </NavLink>
                <NavLink to="/snow" activeClassName={`active--${getDayNightColors()}`}>
                    <IoIosSnow
                        className={`icon icon__${getDayNightColors()}`}
                        onClick={() => handleIconClick("snow")}
                    />
                </NavLink>

                {/*<Switch>*/}
                {/*    <Route path="/sun">*/}
                {/*        {selectedIcon === "sun" && <SunComponent/>}*/}
                {/*    </Route>*/}
                {/*    <Route path="/rain">*/}
                {/*        {selectedIcon === "rain" && <RainComponent/>}*/}
                {/*    </Route>*/}
                {/*    <Route path="/snow">*/}
                {/*        {selectedIcon === "snow" && <SnowComponent/>}*/}
                {/*    </Route>*/}
                {/*</Switch>*/}
            </div>
            <p className={`weather__dsc weather__dsc--${getDayNightColors()}`}>Look out the window and choose the conditions outside, then decide how you want to spend your time</p>
        </section>
    );
}