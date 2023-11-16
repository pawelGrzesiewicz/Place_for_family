import '../scss/App.scss';

import Home from "./views/Home.jsx";
import SignUp from "./views/SignUp.jsx";
import SignIn from "./views/SignIn.jsx";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
            </Routes>
        </Router>
    );
}

export default App
