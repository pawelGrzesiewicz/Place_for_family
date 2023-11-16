import {useEffect, useState} from 'react';
import supabase from '../../api/supabase.js';
import {useNavigate} from 'react-router-dom';

import {Headline} from "../components/Headline.jsx";
import {NavBar} from "../components/NavBar.jsx";

export default function Home() {
    const navigation = useNavigate();

    const [notes, setNotes] = useState(null);
    const [currentHour, setCurrentHour] = useState(new Date().getHours());


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentHour(new Date().getHours());
        }, 1000 * 60);

        return () => clearInterval(intervalId);
    }, []);

    const getBackgroundColor = () => {
        if (currentHour >= 6 && currentHour < 21) {
            return 'day-background';
        } else {
            return 'night-background';
        }
    };


    useEffect(() => {
        getSession();
    }, []);

    async function getSession() {
        const {data, error} = await supabase.auth.getSession();

        console.log('dane:', data)

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


    async function handleOnSubmit(e) {
        e.preventDefault();

        const {data, error} = await supabase
            .from('notes')
            .insert([{note: e.target.elements[0].value}])
            .select();

        if (!error) {
            setNotes(prev => [...prev, data[0]]);
        }
    }


    async function handleSignOut() {
        const {error} = await supabase.auth.signOut();

        if (!error) {
            navigation('/signin');
        }
    }


    return (
        <section className={`home ${getBackgroundColor()}`}>
            <Headline getSession={getSession}/>
            <NavBar/>

            <form onSubmit={handleOnSubmit}>
                <textarea/>
                <button>Save</button>
            </form>
            <ul>
                {notes && notes.map((note) => <li key={note.id}>{note.note}</li>)}
            </ul>
            <button
                className='btn'
                onClick={handleSignOut}>Sign out
            </button>
        </section>
    );
}

