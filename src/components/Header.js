import React from 'react'
const Header = ({darkMode, toggleDarkMode}) => { // this is a functional component and a js function that return JSX. the component is using props. darkMode (tells whether dark mode is enabled) and toggleDarkMode (is a function that toggles it when clicked). they are passed in as arguments.

  return (
    <>
    <header className={`header ${darkMode ? 'dark' : 'light'}`}>
        <div>
            <h1>Where in the world?</h1>
        </div>

        <div className='dark-mode' onClick={toggleDarkMode}>
            <i class="fa-solid fa-moon"></i>{darkMode ? 'Light Mode' : 'Dark Mode'}
        </div>
    </header>
    </>
  )
}

export default Header