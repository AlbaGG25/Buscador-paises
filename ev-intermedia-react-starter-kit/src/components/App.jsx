////imports: dependencies, styles, components...
import "../styles/Index.scss";
import "../styles/core/Reset.scss";
import { useEffect, useState } from "react";
import Services from "./Services";
import getDataFromApi from "./Services";

//////functions, variables, handles...
const App = () => {
  const [country, setCountry] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [filterContinent, setFilterContinent] = useState("All");

  useEffect(() => {
    getDataFromApi().then((cleanData) => {
      setCountry(cleanData);
    });
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleSearch = (ev) => {
    setFilterCountry(ev.target.value);
  };

  const handleFilterContinent = (ev) => {
    setFilterContinent(ev.target.value);
  };

  const renderCountriesList = () => {
    return country
      .filter((eachCountry) =>
        eachCountry.name.toLowerCase().includes(filterCountry.toLowerCase())
      )

      .filter((eachCountry) =>
        filterContinent === "All"
          ? true
          : eachCountry.continents.includes(filterContinent)
      )

      .map((eachCountry, index) => (
        <li className="main_sectionList-country" key={index}>
          <p>{eachCountry.flag}</p>
          <p>{eachCountry.name}</p>
          <p>{eachCountry.capital}</p>
          <p>{eachCountry.continents}</p>
        </li>
      ));
  };

  return (
    <>
      <header className="header">
        <h1>Country info App</h1>
        <p>
          Explore information about countries, capitals and flags. Add new
          countries and filter through the list!
        </p>
      </header>
      <main className="main">
        <section >
          <form className="main_sectionForm" onSubmit={handleSubmit}>
            <label htmlFor="search">By country</label>
            <input
              className="main_sectionForm-input"
              type="text"
              name="search"
              value={filterCountry}
              id="search"
              placeholder="Spain..."
              onChange={handleSearch}
            />

            <label htmlFor="continents">By continents</label>
            <select
              className="main_sectionForm-input"
              name="continents"
              id="continents"
              onChange={handleFilterContinent}
              value={filterContinent}>
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="North America">North america</option>
              <option value="South America">South america</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
            </select>
          </form>
        </section>
        <section >
          <ul className="main_sectionList">{renderCountriesList()}</ul>
        </section>
      </main>
    </>
  );
};

export default App;
