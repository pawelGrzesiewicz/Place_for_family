import React from "react";
import useDayNightMode from "../hooks/useDayNightMode.js";


export function NavBar_Options ({setSelectedOption, selectedOption}) {


    const {getDayNightColors} = useDayNightMode();


    const handleNavItemClick = (option) => {
        setSelectedOption(option);
    };


    return (
        <nav className="nav">
                <span
                    className={`nav__item nav__item--${getDayNightColors()} ${
                        selectedOption === "active" ? `selected--${getDayNightColors()}` : ""
                    }`}
                    onClick={() => handleNavItemClick("active")}
                >
                    Active
                </span>
            <span
                className={`nav__item nav__item--${getDayNightColors()} ${
                    selectedOption === "learn" ? `selected--${getDayNightColors()}` : ""
                }`}
                onClick={() => handleNavItemClick("learn")}
            >
                    Learn
                </span>
            <span
                className={`nav__item nav__item--${getDayNightColors()} ${
                    selectedOption === "chill" ? `selected--${getDayNightColors()}` : ""
                }`}
                onClick={() => handleNavItemClick("chill")}
            >
                    Chill
                </span>
        </nav>
    )
}