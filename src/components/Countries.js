import React, {useState, useEffect} from 'react'; // in order to use JSX we import react
import { Link } from 'react-router-dom';

const url = 'https://restcountries.com/v3.1/all';

const Countries = ({searchTerm, region}) => { // a functional component
    const [countries, setCountries] = useState([]); // countries: holds lists of countries. setCountries: function used to update that list. useState([]): starts with an empty array. Think of it like: “countries” is your data, “setCountries” changes it when new data comes.

    const fetchCountryData = async () => { // fetches data from API and it will run when the component loads (triggered by useEffect).
        const response = await fetch(url); // fetch sends a request to API URL, await tells js to wait for the response before continuing.
        const data = await response.json(); // converts the respond which is raw text into JSON format so we can work with it like an object (an array of country objects).
        setCountries(data); // updates your countries state with the new data.
        console.log(data); // for debugging
    }
    
    useEffect(() => { // useEffect runs fetchCountryData() only once, when the component first mounts.
        fetchCountryData();
    }, []);  // [] dependency array means "run this effect only once". like saying: "When this component first appears on screen, fetch the countries."
    
  return ( // Returns the JSX UI — the HTML-like syntax that React renders.
    <>
        <section className='grid'>
        {countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) && (region === '' || country.region === region)).map((country) => { // This loops through the list of countries and returns a card for each one.  region === '' checks if region state is an empty srting and includes all countries if no country is selected, if country.region === region, meaning user has selected a country.
            const key = country.cca3; // A unique key for React rendering. cca3 is a 3-letter country code (like "AFG").
            const name = country.name.common;
            const flag = country.flags.png;
            const population = country.population;
            const region = country.region;
            const capital = country.capital?.[0] || 'N/A'; // capital is usually an array — we take the first value. ?.[0] = optional chaining (in case it’s undefined). If there’s no capital, it shows “N/A” (Not Available).

            return ( 
                <article key={key}> {/* key={key} is required by React to track elements in a list */}
                    <div className='article'>
                        <img src={flag} alt={name} />

                        <div className='details'>
                            <h3>{name}</h3>
                            <h4>
                                Population: <span>{population.toLocaleString()}</span> {/* .toLocaleString() formats the number with commas (e.g. 1,234,567). */}
                            </h4>
                            <h4>
                                Region: <span>{region}</span>
                            </h4>
                            <h4>
                                Capital: <span>{capital}</span>
                            </h4>
                            <div className='buttons'>
                                <Link to={`/countries/${name}`}className='btn'>Learn More</Link>
                            </div>
                        </div>
        
                    </div>
                </article>
            );
        })}
        </section>
    </>
  );
};

export default Countries // This line allows you to import this component into another file (like App.js). So when you write <Countries /> somewhere else, this component is used.