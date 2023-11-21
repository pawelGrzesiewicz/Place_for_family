import React, {useEffect, useState} from "react";
import supabase from "../../api/supabase.js";
import Slider from "./Slider.jsx";
import {WeatherBar} from "./WeatherBar.jsx";
import {RecreationOptionsBar} from "./RecreationOptionsBar.jsx";

export function NavBar() {


    const [active, setActive] = useState(null);
    const [learn, setLearn] = useState(null);
    const [chill, setChill] = useState(null);

    const [selectedOption, setSelectedOption] = useState('active');
    const [selectedWeather, setSelectedWeather] = useState('sun');


    useEffect(() => {
        getActive();
        getEducation();
        getChill();
    }, [selectedOption]);

    async function getActive() {
        let {data: activeData, error} = await supabase
            .from("active")
            .select("*");

        if (!error) {
            setActive(parseArray(activeData));
        }
    }

    async function getEducation() {
        let {data: learnData, error} = await supabase
            .from("learn")
            .select("*");

        if (!error) {
            setLearn(parseArray(learnData));
        }
    }

    async function getChill() {
        let {data: chillOutData, error} = await supabase
            .from("chillOut")
            .select("*");

        if (!error) {
            setChill(parseArray(chillOutData));
        }
    }

    function parseArray(data) {
        if (data && data.length > 0) {
            return data.map(item => ({
                ...item,
                weather: Array.isArray(item.weather) ? item.weather : JSON.parse(item.weather)
            }));
        }
        return data;
    }


    return (
        <>
            <WeatherBar
                selectedWeather={selectedWeather}
                setSelectedWeather={setSelectedWeather}
            />

            <RecreationOptionsBar
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
            />

            {selectedOption === "active" && (
                <Slider data={active && selectedWeather
                    ? active.filter((item) =>
                        Array.isArray(item.weather)
                            ? item.weather.includes(selectedWeather)
                            : item.weather === selectedWeather
                    )
                    : active
                }/>
            )}
            {selectedOption === "learn" && (
                <Slider data={learn && selectedWeather
                    ? learn.filter((item) =>
                        Array.isArray(item.weather)
                            ? item.weather.includes(selectedWeather)
                            : item.weather === selectedWeather
                    )
                    : learn
                }/>
            )}
            {selectedOption === "chill" && (
                <Slider data={chill && selectedWeather
                    ? chill.filter((item) =>
                        Array.isArray(item.weather)
                            ? item.weather.includes(selectedWeather)
                            : item.weather === selectedWeather
                    )
                    : chill
                }/>
            )}
        </>
    );
}