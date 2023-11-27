import React, {useState} from "react";
import useDayNightMode from "../hooks/useDayNightMode.js";
import supabase from '../../api/supabase';

export default function AddOption() {

    const options = [
        {id: 'option1', label: 'sun'},
        {id: 'option2', label: 'rain'},
        {id: 'option3', label: 'snow'},
    ];

    const {getDayNightColors} = useDayNightMode();
    const [title, setTitle] = useState(null);
    const [selectedWeather, setSelectedWeather] = useState([]);
    const [search, setSearch] = useState(null);


    const handleCheckboxChange = (value) => {
        if (selectedWeather.includes(value)) {
            setSelectedWeather(selectedWeather.filter(option => option !== value));
        } else {
            setSelectedWeather([...selectedWeather, value]);
        }
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase
            .from('active')
            .insert([{note: e.target.elements[0].value}])
            .select()

        if (!error) {
            setNotes(prev => [...prev, data[0]]);
        }


        return (
            <section className={`add ${getDayNightColors()}`}>
                <div className='add-glass'>
                    <h2 className={`add-glass__hdl add-glass__hdl--${getDayNightColors()}`}>Create your own option</h2>
                    <form className='add-glass__form' onSubmit={handleOnSubmit}>
                        <div className='form-group'>
                            <input
                                className={`form-group__in form-group__in--${getDayNightColors()}`}
                                type="text"
                                placeholder="Title of Option"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className={`weather-check weather-check--${getDayNightColors()}`}>
                            <label>During what weather:</label>
                            <div className='checkmarks'>
                                {options.map(option => (
                                    <div key={option.id} className={`checkmark checkmark--${getDayNightColors()}`}>
                                        <input
                                            type="checkbox"
                                            id={option.id}
                                            value={option.id}
                                            checked={selectedWeather?.includes(option.id) || false}
                                            onChange={() => handleCheckboxChange(option.id)}
                                        />
                                        <label htmlFor={option.id}>{option.label}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='form-group'>
                            <input
                                className={`form-group__in form-group__in--${getDayNightColors()}`}
                                type="text"
                                placeholder="Search terms in maps"
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                        </div>

                        {/*{error && <p className={`error error--${getDayNightColors()}`}>{error}</p>}*/}
                        <button type="submit" className={`btn form__btn form__btn--${getDayNightColors()}`}>Send
                        </button>
                    </form>
                </div>
            </section>
        )
    }
}