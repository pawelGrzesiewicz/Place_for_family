import {useEffect, useState} from 'react';
import supabase from '../../api/supabase.js';
import {useNavigate} from 'react-router-dom';
import {Home_Headline} from "../components/Home_Headline.jsx";
import {Home_NavBar} from "../components/Home_NavBar.jsx";
import Footer from "../components/Footer.jsx";
import useDayNightMode from "../hooks/useDayNightMode.js";
import {useFamilyData} from "../hooks/FamilyDataContext.jsx";
import {Home_AddYourOwnOption} from "../components/Home_AddYourOwnOption.jsx";

export default function Home() {

    const {familyData, updateFamilyData} = useFamilyData();
    const [error, setError] = useState(null);
    const {getDayNightColors} = useDayNightMode();
    const navigate = useNavigate();


    useEffect(() => {
        getSession();
    }, []);

    async function getSession() {
        const {data, error} = await supabase.auth.getSession();

        if (!data.session) {
            navigate('/signup');
            return;
        }

        await getFamilyData();
    }

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
                updateFamilyData(data);
            }
        } catch (error) {
            console.error(error.message);
            setError("An error occurred while retrieving family information.");
        }
    }


    return (
        <section className={`home ${getDayNightColors()}`}>
            <Home_Headline familyData={familyData}/>
            <Home_NavBar/>
            <Home_AddYourOwnOption/>
            <Footer/>
        </section>
    );
}

