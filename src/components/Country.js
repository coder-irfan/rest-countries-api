import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // link: a component that creates links that enables navigation without reloading the page. useParams: a hook from react-router-dom that allows you to access parameters from the URL.
import '../country.css';

const Country = () => {
  const [country, setCountry] = useState(null); // initializes the country to null which will later hold the country data once fetched.
  const { name } = useParams(); 

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await response.json();
      setCountry(data[0]);
      console.log(data[0]);
    };

    fetchCountryData();
  }, [name]);

  if (!country) return <h2>Loading...</h2>; // checks if the country state is still null eg: the data has not been fetched yet.

  // Destructure country details
  const { cca3, flags, name: countryName, population, region, subregion, capital, tld, currencies, languages, borders } = country;

  return (
    <>
      <div className='back-home'>
        
        <section className='country'>
          <Link to='/' className='btn btn-light'> {/* provides a clickable button that takes the user back to the home page */}
          <i className='fas fa-arrow-left'></i> Back
          </Link>
          <article key={cca3}> {/* every country is rendred as an article with a unique key prop */}
            <div className='flag'>
              <img src={flags.png} alt={countryName.common} />
            </div>

            <div className='country-details'>
              <div>
                <h2>{countryName.common}</h2>
                <h5>Native Name: <span>{country.name.nativeName ? Object.values(country.name.nativeName)[0].common: 'N/A'}</span></h5>
                <h5>Population: <span>{population.toLocaleString()}</span></h5>
                <h5>Region: <span>{region}</span></h5>
                <h5>Sub Region: <span>{subregion}</span></h5>
                <h5>Capital: <span>{capital?.[0]}</span></h5>
              </div>

              <div>
                <h5>Top Level Domain: <span>{tld?.[0]}</span></h5>
                <h5>Currencies: <span>{currencies ? Object.values(currencies)[0].name : 'N/A'}</span></h5>
                <h5>Languages: <span>{languages ? Object.values(languages).join(', ') : 'N/A'}</span></h5>
              </div>

              <div className='borders'>
                <h3>Border Countries: </h3>
                <div className='inner-borders'>
                  {borders ? (borders.map((border) => (
                      <ul key={border}>
                        <li>{border}</li>
                      </ul>
                    ))
                  ) : (
                    <p>No Borders</p>
                  )}
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </>
  );
};

export default Country;
