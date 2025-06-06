import { Routes, Route } from "react-router";
import './App.css';
import Navbar from '../src/Navbar/Navbar';
import Home from '../src/Pages/Home/Home';
import Signup from '../src/Pages/Signup/Signup';
import Demo from '../src/Pages/Demo/Demo';
import Userpage from '../src/Pages/UserPage/userpage';
import { useState } from "react";
import { BrowserRouter } from 'react-router';
import DarkModeVariable from './Navbar/DarkModeVariable';
function App() {

    const [isDark, setIsDark] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <>
            <BrowserRouter>
                <div data-theme={isDark ? "dark" : "light"}>
                    <DarkModeVariable.Provider value={isDark}>
                        <Navbar isDark={isDark} updateDarkMode={setIsDark} isLoggedIn={isLoggedIn} />
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="signin" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn } />} />
                            <Route path="demo" element={<Demo />} />
                            <Route path="userpage" element={<Userpage/>} />
                        </Routes>
                    </DarkModeVariable.Provider>
                </div>
            </BrowserRouter>
        </>
    );


}

export default App;