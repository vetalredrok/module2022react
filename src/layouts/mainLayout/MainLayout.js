import React, {useContext} from 'react';
import {Footer, Navigation} from "../../components";
import {Outlet} from "react-router-dom";

import {DarkModeContext} from "../../context";



const MainLayout = () => {

    const [darkMode, setDarkMode] = useContext(DarkModeContext);


    return (
        <div style={{backgroundColor: darkMode ? '#404040' : '#fff',
            color: darkMode? '#fff' : '#000', height: '100%'}}>
            <section style={{backgroundColor: darkMode ? '#404040' : '#fff',
            color: darkMode? '#fff' : '#000', height: '100%'
            }}>
            <Navigation/>
            </section>
            <section style={{backgroundColor: darkMode ? '#404040' : '#fff',
                color: darkMode? '#fff' : '#000', height: '100%'
            }}>
                <Outlet/>
            </section>
            <Footer/>
        </div>
    );
};

export {MainLayout};