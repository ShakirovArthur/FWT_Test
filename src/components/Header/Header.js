import "./Header.css";

export const Header = ({switchTheme, theme}) => {

    return (
        <div className='header'>
            <img className='header-logo' src='Logo.svg' alt='Logo'/>
            <img className='icon-swith-theme' onClick={switchTheme}
                 src={theme === 'light' ? 'IconLightTheme.svg' : 'IconDarkTheme.svg'} alt='SwitchTheme'/>
        </div>
    )
}