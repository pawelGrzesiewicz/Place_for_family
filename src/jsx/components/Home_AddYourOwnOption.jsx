import React from "react";
import {IoIosAddCircleOutline} from "react-icons/io";
import useDayNightMode from "../hooks/useDayNightMode.js";
import {Link} from "react-router-dom";

export function Home_AddYourOwnOption() {

    const {getDayNightColors} = useDayNightMode();

    return (
        <Link to='/add' className='add-option'>
            <IoIosAddCircleOutline className={`add-option__icon add-option__icon--${getDayNightColors()}`}/>
            <p className={`add-option__dsc add-option__dsc--${getDayNightColors()}`}>Add your own option</p>
        </Link>
    )
}