import "./App.css";
import { Header } from "./components/Header/Header";
import { MainPage } from "./components/MainPage/MainPage";
import { useState } from "react";


export const App = () => {
    const [theme, setTheme] = useState('light')
    const handleClickTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return (
        <div className='dark-light-theme' data-theme={theme}>
            <div className='App'>
                <Header switchTheme={handleClickTheme} theme={theme}/>
                <MainPage theme={theme}/>
            </div>
        </div>
    );
}


