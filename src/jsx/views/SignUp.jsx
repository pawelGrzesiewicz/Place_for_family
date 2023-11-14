import supabase from "../../api/supabase.js";
import {useNavigate} from 'react-router-dom';
import React, {useState} from "react";

export default function SignUp() {
    const navigation = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase.auth.signUp({
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
        <div className='signUp'>
            <h2 className='signUp__hdl'>Sign Up</h2>
            <form className='signUp__form' onSubmit={handleOnSubmit}>
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
                <button type="submit" className='btn form_btn'>Sign up</button>
            </form>
        </div>
    );
}
