
const getDataFromApi = () => {
  return fetch("https://restcountries.com/v3.1/all")
  .then((response)=> response.json())
  .then ((data) => {
    const cleanData = data.map (country=>{
        return {
          flag: country.flag,
          id: country.cca2,
          name: country.name.official,
          capital: country.capital,
          continents: country.continents,
        };
    });
    return cleanData; 
  });
};


export default getDataFromApi;
