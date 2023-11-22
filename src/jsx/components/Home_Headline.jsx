import React, {useState, useEffect} from 'react';
import supabase from "../../api/supabase.js";
import useDayNightMode from "../hooks/useDayNightMode.js";
import {FaTheRedYeti} from "react-icons/fa";


export function Home_Headline() {

    const [familyData, setFamilyData] = useState(null);
    const [error, setError] = useState(null);
    const {getDayNightColors} = useDayNightMode();


    useEffect(() => {
        getFamilyData();
    }, []);

    async function getFamilyData() {

        try {
            const {data: {user}} = await supabase.auth.getUser()
            const userEmail = user?.email;

            const {data, error} = await supabase
                .from('usersData')
                .select('*')
                .eq('email', userEmail);

            if (error) {
                console.error(error);
                setError("Error retrieving family data. try again.");
            } else {
                setFamilyData(data);
            }
        } catch (error) {
            console.error(error.message);
            setError("An error occurred while retrieving family information.");
        }
    }

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