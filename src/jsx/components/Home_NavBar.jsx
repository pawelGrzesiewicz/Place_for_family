import React, {useEffect, useState} from "react";
import supabase, {updateLikedStatus} from "../../api/supabase.js";
import Home_Slider from "./Home_Slider.jsx";
import {NavBar_Weather} from "./NavBar_Weather.jsx";
import {NavBar_Options} from "./NavBar_Options.jsx";



export function Home_NavBar() {
    const [active, setActive] = useState(null);
    const [learn, setLearn] = useState(null);
    const [chill, setChill] = useState(null);

    const [selectedOption, setSelectedOption] = useState('active');
    const [selectedWeather, setSelectedWeather] = useState('sun');


    useEffect(() => {
        getActive();
        getEducation();
        getChill();
    }, [selectedOption, selectedWeather]);

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

    const handleLikeClick = async (formId, tableName) => {
        let dataToUpdate;
        let setDataFunction;

        switch (tableName) {
            case 'active':
                dataToUpdate = active;
                setDataFunction = setActive;
                break;
            case 'learn':
                dataToUpdate = learn;
                setDataFunction = setLearn;
                break;
            case 'chill':
                dataToUpdate = chill;
                setDataFunction = setChill;
                break;
            default:
                return;
        }

        setDataFunction((prevData) => {
            const updatedData = prevData.map((item) =>
                item.id === formId ? { ...item, liked: !item.liked } : item
            );
            return updatedData;
        });

        await updateLikedStatus(tableName, formId, !dataToUpdate.find((item) => item.id === formId).liked);
    };


    return (
        <>
            <NavBar_Weather
                selectedWeather={selectedWeather}
                setSelectedWeather={setSelectedWeather}
            />

            <NavBar_Options
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
            />

            {selectedOption === "active" && (
                <Home_Slider
                    data={active && selectedWeather
                    ? active.filter((item) =>
                        Array.isArray(item.weather)
                            ? item.weather.includes(selectedWeather)
                            : item.weather === selectedWeather
                    )
                    : active
                }
                    likedData={active}
                    onLikeClick={(formId) => handleLikeClick(formId, 'active')}
                />
            )}
            {selectedOption === "learn" && (
                <Home_Slider
                    data={learn && selectedWeather
                    ? learn.filter((item) =>
                        Array.isArray(item.weather)
                            ? item.weather.includes(selectedWeather)
                            : item.weather === selectedWeather
                    )
                    : learn
                }
                    likedData={learn}
                    onLikeClick={(formId) => handleLikeClick(formId, 'learn')}
                />
            )}
            {selectedOption === "chill" && (
                <Home_Slider
                    data={chill && selectedWeather
                    ? chill.filter((item) =>
                        Array.isArray(item.weather)
                            ? item.weather.includes(selectedWeather)
                            : item.weather === selectedWeather
                    )
                    : chill
                }
                    likedData={chill}
                    onLikeClick={(formId) => handleLikeClick(formId, 'chill')}
                />
            )}
        </>
    );
}