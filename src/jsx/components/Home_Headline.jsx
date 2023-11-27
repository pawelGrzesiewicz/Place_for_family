import React from 'react';
import useDayNightMode from "../hooks/useDayNightMode.js";
import {FaTheRedYeti} from "react-icons/fa";
import {useFamilyData} from "../hooks/FamilyDataContext.jsx";


export function Home_Headline() {

    const {getDayNightColors} = useDayNightMode();
    const { familyData, updateFamilyData } = useFamilyData();


    return (
        <section className='greeting'>
            <div className={`hdl hdl--${getDayNightColors()}`}>
                {familyData?.map((family) => (
                    <div key={family.id}>
                        <span>Welcome</span>
                        <div className='hdl__name'>
                            <h1>{family.name}</h1>
                            <span>family</span>
                        </div>
                        <div className='hdl__from'>
                            <span>from</span>
                            <h1>{family.city}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <FaTheRedYeti className={`avatar__icon avatar__icon--${getDayNightColors()}`}/>
        </section>
    );
}