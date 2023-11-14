import React from "react";
import {WeatherBar} from "./WeatherBar.jsx";

export function NavBar() {
    return (
        <div>
            <WeatherBar />
            <nav className='navBar'>
                <a href="">Active</a>
                <a href="">Learn</a>
                <a href="">Chill</a>
            </nav>
        </div>

    );
}
