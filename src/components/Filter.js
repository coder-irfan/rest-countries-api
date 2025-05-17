import React from 'react'

const Filter = ({searchTerm, setSearchTerm, region, setRegion}) => {

  return (
    <section className='filter'>
        <form className='form-control'>
            <i className='fa-solid fa-search'></i>
            <input type="text" value={searchTerm} placeholder='Search for a country...' onChange={(e) => setSearchTerm(e.target.value)} /> {/* e.target.value gets the value that the user enters, and passed to setSearchTerm, which updates the state. */}
        </form>

        <div className='region-filter'>
            <select name='select' className='select' value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="" disabled hidden>Filter by Region</option> {/* a placeholder option that shows when no region is selected. it is disabled so the user cannot select it and hidden after a region is chosen. */}
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
    </section>
  )
}

export default Filter