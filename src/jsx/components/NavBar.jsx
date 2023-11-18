import React, {useEffect, useState} from "react";
import useDayNightMode from "../hooks/useDayNightMode.js";
import supabase from "../../api/supabase.js";
import Slider from "./Slider.jsx";

export function NavBar() {
    const {getDayNightColors} = useDayNightMode();

    const [active, setActive] = useState(null);
    const [learn, setLearn] = useState(null);
    const [chill, setChill] = useState(null);
    const [selectedNavItem, setSelectedNavItem] = useState('active');

    console.log(selectedNavItem);

    useEffect(() => {
        getActive();
        getEducation();
        getChill();
    }, [selectedNavItem]);

    async function getActive() {
        let {data: activeData, error} = await supabase
            .from("active")
            .select("*");

        if (!error) {
            setActive(activeData);
        }
    }

    async function getEducation() {
        let {data: learnData, error} = await supabase
            .from("learn")
            .select("*");

        if (!error) {
            setLearn(learnData);
        }
    }

    async function getChill() {
        let {data: chillOutData, error} = await supabase
            .from("chillOut")
            .select("*");

        if (!error) {
            setChill(chillOutData);
        }
    }

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    return (
        <>
            <nav className="nav">
                <span
                    className={`nav__item nav__item--${getDayNightColors()} ${
                        selectedNavItem === "active" ? `selected--${getDayNightColors()}` : ""
                    }`}
                    onClick={() => handleNavItemClick("active")}
                >
                    Active
                </span>
                <span
                    className={`nav__item nav__item--${getDayNightColors()} ${
                        selectedNavItem === "learn" ? `selected--${getDayNightColors()}` : ""
                    }`}
                    onClick={() => handleNavItemClick("learn")}
                >
                    Learn
                </span>
                <span
                    className={`nav__item nav__item--${getDayNightColors()} ${
                        selectedNavItem === "chill" ? `selected--${getDayNightColors()}` : ""
                    }`}
                    onClick={() => handleNavItemClick("chill")}
                >
                    Chill
                </span>
            </nav>

            {selectedNavItem === "active" && <Slider data={active}/>}
            {selectedNavItem === "learn" && <Slider data={learn}/>}
            {selectedNavItem === "chill" && <Slider data={chill}/>}

        </>
    );

}