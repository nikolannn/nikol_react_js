import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce'; // Import debounce from lodash

import CountryDetails from './components/CountryDetails';
import Flag from './components/Flag';
import Borders from './components/Borders';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [country, setCountry] = useState(null);
  const [search, setSearch] = useState('afghanistan'); // Default search term
  const [error, setError] = useState(null); // To track errors, like country not found
  const [suggestions, setSuggestions] = useState([]); // To store country suggestions

  // Function to fetch country data
  const fetchCountryData = useCallback((searchTerm) => {
    axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then(response => {
        if (response.data && response.data.length > 0) {
          const countryData = response.data.find(country => 
            country.name.common.toLowerCase() === searchTerm.toLowerCase()
          );
          
          if (countryData) {
            setCountry(countryData); // Set the country data
            setError(null); // Reset error state
          } else {
            setCountry(null); // No exact match found
            setError('Country not found'); // Show an error message
          }
        } else {
          setCountry(null); // Handle country not found
          setError('Country not found');
        }
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
        setCountry(null);
        setError('Error fetching country data');
      });
  }, []);

  // Function to fetch country suggestions
  const fetchCountrySuggestions = (searchTerm) => {
    axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then(response => {
        if (response.data && response.data.length > 0) {
          setSuggestions(response.data); // Set country suggestions
        } else {
          setSuggestions([]); // Clear suggestions if no data found
        }
      })
      .catch(error => {
        console.error('Error fetching country suggestions:', error);
        setSuggestions([]); // Clear suggestions on error
      });
  };

  // Debounced search handler
  const debouncedSearch = useCallback(debounce((searchTerm) => {
    fetchCountryData(searchTerm);
    fetchCountrySuggestions(searchTerm);
  }, 500), [fetchCountryData]);

  // Handler for search input change
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm); // Update search term
    debouncedSearch(searchTerm); // Call the debounced search
  };

  // Fetch data on initial load and whenever search term changes
  useEffect(() => {
    fetchCountryData(search); // Fetch data for the initial country or the search term
    fetchCountrySuggestions(search); // Fetch country suggestions as well
  }, [search, fetchCountryData]); // Dependency on search and fetchCountryData function

  const handleSuggestionClick = (suggestedCountry) => {
    setCountry(suggestedCountry); // Set the selected country
    setSuggestions([]); // Clear suggestions
    setSearch(suggestedCountry.name.common); // Update search term
  };

  return (
    <div className="font-sans">
      <Header />

      {/* Search Input */}
      <div className="relative w-1/2 max-w-xl mt-8">
        <input
          type="text"
          placeholder="Search for a country"
          value={search}
          onChange={handleSearchChange} // Trigger debounced search
          className="search-input"
        />
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestedCountry) => (
              <li
                key={suggestedCountry.cca3}
                onClick={() => handleSuggestionClick(suggestedCountry)} // Set country when suggestion is clicked
              >
                {suggestedCountry.name.common}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Show error if country not found */}
      {error && <div className="error-message">{error}</div>}

      {/* Country Data */}
      {country && (
        <div className="country-box">
          <Flag flagUrl={country.flags.svg} />
          <CountryDetails country={country} />
          <Borders borders={country.borders} setCountry={setCountry} setError={setError} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
