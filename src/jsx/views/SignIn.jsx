import React, {useState} from 'react';
import supabase from '../../api/supabase';
import {useNavigate, Link} from 'react-router-dom';
import useDayNightMode from "../hooks/useDayNightMode.js";

export default function SignIn() {
    const navigation = useNavigate();
    const {getDayNightColors} = useDayNightMode();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (!error) {
            navigation('/');
        } else {
            setError(error.message)
        }

        console.log(error);
    }

    return (
        <section className={`signIn ${getDayNightColors()}`}>
            <div className='signIn-glass'>
                <h2 className={`signIn-glass__hdl signIn-glass__hdl--${getDayNightColors()}`}>Sign In</h2>
                <form className='signIn-glass__form' onSubmit={handleOnSubmit}>
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
                    {error && <p className={`error error--${getDayNightColors()}`}>{error}</p>}
                    <button type="submit" className={`btn form__btn form__btn--${getDayNightColors()}`}>Sign in</button>
                </form>
                <p className={`link link--${getDayNightColors()}`}>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </section>
    );
}

