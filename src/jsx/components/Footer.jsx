import React from "react";
import useDayNightMode from "../hooks/useDayNightMode.js";
import { FaGithub } from "react-icons/fa";
import supabase from "../../api/supabase.js";
import {useNavigate} from "react-router-dom";

export default function Footer() {
    const navigation = useNavigate();
    const {getDayNightColors} = useDayNightMode();


    async function handleSignOut() {
        const {error} = await supabase.auth.signOut();

        if (!error) {
            navigation('/signin');
        }
    }

    return (
        <footer className='footer'>
            <div className='out'>
                <p className={`out__hdl out__hdl--${getDayNightColors()}`}>
                    are you done for today?
                </p>
                <a
                    className={`out__link out__link--${getDayNightColors()}`}
                    onClick={handleSignOut}>Sign out
                </a>
            </div>
            <div className={'made'}>
                <a href="https://github.com/pawelGrzesiewicz">
                    <FaGithub className={`made__icon made__icon--${getDayNightColors()}`}/>
                </a>
                <p className={`made__hdl made__hdl--${getDayNightColors()}`}>&copy; made by pawelGrzesiewicz</p>
            </div>
        </footer>
    );
};
