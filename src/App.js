import React, {useEffect, useState} from 'react';  // useEffect => performing side effects in functional components like fetching data and updating DOM. useState => manage state like storing values eg: whether the dark mode in on.
import {HashRouter as Router, Route, Routes} from 'react-router-dom'; // importing routing system from react-router-dom. helps manage navigation (URLs) in your app.
import Header from './components/Header';
import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';
function App() { // defines the main functional component of app where most of logic will go.
    const [searchTerm, setSearchTerm] = useState(''); // the first value in the array is the current state, the second is the function used to update it.
    const [darkMode, setDarkMode] = useState(false);
    const [region, setRegion] = useState('');

    const toggleDarkMode = () => { // a function that changes darkmode from true to false
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        if(darkMode) { // if true, adds the dark class to the body 
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else { // if false, does the opposite
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        }
    }, [darkMode]); // this effect will run when darkMode changes.

    return (
        <Router> {/* wraps everything in the app and enables routing. the other routes are nested inside Router component. */}
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* this is rendering the Header component, passing darkMode and toggleDarkMode as props.*/}
                <Routes> {/* indide this we define Route elements to specify which component should be rendered for a given path. */}
                    <Route path="/" element={ // the first route is /, the root URL. It renders:
                        <> 
                        <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} region={region} setRegion={setRegion}/>
                        <Countries searchTerm={searchTerm} region={region} />
                        </>
                    } />
                <Route path="/countries/:name" element = {<Country />} /> {/* this is the second route. */}
            </Routes> 
        </Router>  
    );
}
  
export default App; // exports App component so we can use it in other parts of app to render in the browser.
