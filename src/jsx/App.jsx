import React from "react";
import '../scss/App.scss';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./views/Home.jsx";
import SignUp from "./views/SignUp.jsx";
import SignIn from "./views/SignIn.jsx";
import SearchEngine from "./views/SearchEngine.jsx";
import AddOption from "./views/AddOption.jsx";



function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path='/map' element={<SearchEngine/>}/>
                <Route path='/add' element={<AddOption/>}/>
            </Routes>
        </Router>
    );
}

export default App
