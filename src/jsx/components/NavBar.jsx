import React from "react";
import {NavLink} from "react-router-dom";
import {GoSun} from "react-icons/go";
import {IoRainyOutline} from "react-icons/io5";
import {IoIosSnow} from "react-icons/io";
import useDayNightMode from '../hooks/useDayNightMode.js'


export function NavBar() {
    const {getDayNightColors} = useDayNightMode();

    return (
        <nav className='nav'>
            <NavLink to="/active" activeClassName={`active--${getDayNightColors()}`} className='nav__link'>
                <span className={`nav__item nav__item--${getDayNightColors()}`}>Active</span>
            </NavLink>
            <NavLink to="/learn" activeClassName={`active--${getDayNightColors()}`} className='nav__link'>
                <span className={`nav__item nav__item--${getDayNightColors()}`}>Learn</span>
            </NavLink>
            <NavLink to="/chill" activeClassName={`active--${getDayNightColors()}`} className='nav__link'>
                <span className={`nav__item nav__item--${getDayNightColors()}`}>Chill</span>
            </NavLink>

        </nav>

    );
}
