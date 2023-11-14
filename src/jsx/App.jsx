import '../scss/App.scss';

import Home from "./views/Home.jsx";
import SignUp from "./views/SignUp.jsx";
import SignIn from "./views/SignIn.jsx";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage.js'


function App() {
    const [familyName, setFamilyName] = useLocalStorage('');

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home familyName={familyName}/>} />
          <Route path="/signup" element={<SignUp
              setFamilyName={setFamilyName}
              familyName={familyName}
          />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
  );
}

export default App
