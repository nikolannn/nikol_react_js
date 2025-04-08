import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch country data by country code
  const fetchCountryData = async (countryCode) => {
    try {
      const response = await fetch(`https://nationnode.vercel.app/api/v1/countries/${countryCode}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      return data;
    } catch (err) {
      setError('Failed to fetch country data.');
      console.error(err);
    }
  };

  // Fetch data when the app loads
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCountryData('afg');
      if (data) setCountry(data[0]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle search by country name
  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCountryData(query.toLowerCase());
      if (data) setCountry(data[0]);
    } catch (err) {
      setError('Country not found.');
    } finally {
      setLoading(false);
    }
  };

  // Handle border click to fetch data for a border country
  const handleBorderClick = async (countryCode) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCountryData(countryCode);
      if (data) setCountry(data[0]);
    } catch (err) {
      setError('Failed to fetch border country data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // SearchBar component as a functional component inside App.jsx
  const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
      onSearch(searchQuery);
    };

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  };

  return (
    <div className="app">
      <Header />
      <div className="container mt-4">
        <SearchBar onSearch={handleSearch} />

        {country && (
          <div>
            {/* Country Details Section */}
            <h1>{country.name}</h1>
            <p><strong>Capital:</strong> {country.capital}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Population:</strong> {country.population}</p>
            <p><strong>Area:</strong> {country.area} km²</p>
            <p><strong>Coordinates:</strong> {country.latlng.join(', ')}</p>
            <p><strong>Currency:</strong> {country.currencies}</p>
            <p><strong>Languages:</strong> {country.languages.join(', ')}</p>
            <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>

            {/* Flag Section */}
            <div className="flag-container">
              <img
                src={country.flags.png} // Assuming the flag data has the 'png' property
                alt={`${country.name} Flag`}  // alt text for accessibility
                className="img-fluid" // Bootstrap class to make it responsive
              />
            </div>

            {/* Borders Section */}
            <div>
              <h3>Borders</h3>
              {country.borders && country.borders.length > 0 ? (
                <ul>
                  {country.borders.map((border, index) => (
                    <li key={index}>
                      <button onClick={() => handleBorderClick(border)}>
                        {border}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No borders available.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
