import {useEffect, useState} from 'react';
import supabase from '../../api/supabase.js';
import {useNavigate} from 'react-router-dom';

import {Headline} from "../components/Headline.jsx";
import {NavBar} from "../components/NavBar.jsx";
import useDayNightMode from "../hooks/useDayNightMode.js";
import Footer from "../components/Footer.jsx";

export default function Home() {

    const [notes, setNotes] = useState(null);
    const { getDayNightColors } = useDayNightMode();


    useEffect(() => {
        getSession();
    }, []);

    async function getSession() {
        const {data, error} = await supabase.auth.getSession();

        if (!data.session) {
            navigation('/signup');
            return;
        }

        await getNotes();
    }

    async function getNotes() {
        let {data: notes, error} = await supabase.from('notes').select('*');

        if (!error) {
            setNotes(notes);
        }
    }


    // async function handleOnSubmit(e) {
    //     e.preventDefault();
    //
    //     const {data, error} = await supabase
    //         .from('notes')
    //         .insert([{note: e.target.elements[0].value}])
    //         .select();
    //
    //     if (!error) {
    //         setNotes(prev => [...prev, data[0]]);
    //     }
    // }





    return (
        <section className={`home ${getDayNightColors()}`}>
            <Headline/>
            <NavBar/>

            {/*<form onSubmit={handleOnSubmit}>*/}
            {/*    <textarea/>*/}
            {/*    <button>Save</button>*/}
            {/*</form>*/}
            {/*<ul>*/}
            {/*    {notes && notes.map((note) => <li key={note.id}>{note.note}</li>)}*/}
            {/*</ul>*/}

            <Footer/>
        </section>
    );
}

