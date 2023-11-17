import supabase from "../../api/supabase.js";
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import useDayNightMode from "../hooks/useDayNightMode.js";

export default function SignUp() {

    const navigation = useNavigate();
    const {getDayNightColors} = useDayNightMode();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [error, setError] = useState(null);

    async function handleOnSubmit(e) {
        e.preventDefault();

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (signUpError) {
            console.log(signUpError);
            setError("Sign up failed. Please try again.");
            return;
        }

        const { data: insertData, error: insertError } = await supabase
            .from('familyName')
            .insert([{ name: familyName, city: city, email: email }])
            .select();

        if (insertError) {
            console.log(insertError);
            setError("Failed to add family name and city. Please try again.");
            return;
        }

        navigation('/');
    }

    return (
        <section className={`signUp ${getDayNightColors()}`}>
            <div className='signUp-glass'>
                <h2 className={`signUp-glass__hdl signUp-glass__hdl--${getDayNightColors()}`}>Sign Up</h2>
                <form className='signUp-glass__form' onSubmit={handleOnSubmit}>
                    <div className='form-group'>
                        <input
                            className={`form-group__in form-group__in--${getDayNightColors()}`}
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            className={`form-group__in form-group__in--${getDayNightColors()}`}
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            className={`form-group__in form-group__in--${getDayNightColors()}`}
                            type="text"
                            id="city"
                            placeholder="Enter your city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            className={`form-group__in form-group__in--${getDayNightColors()}`}
                            type="text"
                            id="familyName"
                            placeholder="Enter your family name"
                            value={familyName}
                            onChange={(e) => setFamilyName(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={`error error--${getDayNightColors()}`}>{error}</p>}
                    <button type="submit" className={`btn form__btn form__btn--${getDayNightColors()}`}>Sign up</button>
                    <p className={`link link--${getDayNightColors()}`}>Already have an account ? <Link to="/signin">Sign in</Link></p>
                </form>
            </div>
        </section>
    );
}
