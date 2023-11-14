import React, {useState} from 'react';
import supabase from '../../api/supabase';
import {useNavigate, Link} from 'react-router-dom';

export default function SignIn() {
    const navigation = useNavigate();
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
        <div className='signIn'>
            <h2 className='signIn__hdl'>Sign in</h2>
            <form className='signIn__form' onSubmit={handleOnSubmit}>
                <div className='form-group'>
                    <input
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
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className='error'>{error}</p>}
                <button type="submit" className='btn form__btn'>Sign in</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
}

