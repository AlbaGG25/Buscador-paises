////imports: dependencies, styles, components...
import '../styles/App.scss'
import {useEffect, useState} from 'react';

//////functions, variables, handles...
const App = () => {
  const [countriesList, setCountriesList] = useState ([]); 
  const [filterCountry, setFilterCountry] = useState (''); 

 useEffect (()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then((response)=> response.json())
    .then ((data) => {
      const cleanData = data.map (countriesList=>{
        const newList = {
          flag: countriesList.flag,
          id: countriesList.cca2,
          name: countriesList.name.official,
          capital: countriesList.capital,
          continents: countriesList.continents,
        }
        return newList; 
      })
      console.log (cleanData)
      setCountriesList(cleanData)
    })
  }, [])

  const handleSubmit = (ev) => {
    ev.preventDefault ();
  }

  const handleSearch = (ev) => {
   setFilterCountry (ev.target.value); 
  }
  

  const renderCountriesList = () => {
    return countriesList
    .filter ((eachCountry)=> (
      eachCountry.name.toLowerCase().includes (filterCountry.toLowerCase())
     ))
    
    .map((eachCountry, cca2)=>(
      <li className="country" key={cca2} > 
        <p>{eachCountry.flag}</p>
        <p>{eachCountry.name}</p>
        <p>{eachCountry.capital}</p>
        <p> {eachCountry.continents}</p>
      </li>
    ));
   }


  return <>
      <header>
        <h1>Country info App</h1>
        <p>Explore information about countries, capitals and flags. Add new countries and filter through the list!</p>
        </header>
        <main>
        <form onSubmit={handleSubmit}>

        <label>By country</label>
        <input 
        type='text'
        name="search"
        value={filterCountry}
        id= {countriesList.cca2}
        placeholder="Spain..."
        onChange={handleSearch}
        />

        <label>By continents</label>
         <select name='continents' id={countriesList.cca2} >
          <option>All</option>
          <option>Africa</option>
          <option>North america</option>
          <option>South america</option>
          <option>Europe</option>
          <option>Asia</option>
          <option>Oceania</option>
        </select>
        </form>
        <ul>{renderCountriesList()}</ul>
        </main>
    </>;
}

export default App;