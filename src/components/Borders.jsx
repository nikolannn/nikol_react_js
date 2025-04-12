import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Borders.css';

const Borders = ({ borders, setCountry, setError }) => {
  const [borderCountries, setBorderCountries] = useState([]);

  // Fetch border countries' data
  useEffect(() => {
    const fetchBorderCountries = async () => {
      try {
        const countries = await Promise.all(
          borders.map(async (border) => {
            const response = await axios.get(`https://restcountries.com/v3.1/alpha/${border}`);
            return response.data[0];
          })
        );
        setBorderCountries(countries);
      } catch (error) {
        console.error("Error fetching border countries:", error);
        setError("Failed to fetch the border of the countries");
      }
    };

    if (borders && borders.length > 0) {
      fetchBorderCountries();
    }
  }, [borders, setError]);

  // Handle border country click to fetch and display data
  const handleBorderClick = async (countryCode) => {
    try {
      setCountry(null); // Optional: Clear the current country before fetching the clicked border country
      await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`).then((response) => {
        setCountry(response.data[0]); // Set the clicked border country data
        setError(''); // Clear any previous errors
      });
    } catch (error) {
      console.error("Error fetching clicked border country:", error);
      setError("Failed to fetch border country data");
    }
  };

  return (
    <div className="borders mt-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800">Border Countries:</h3>
      <ul className="list-disc ml-5 mt-4 space-y-3">
        {borderCountries.map((border) => (
          <li
            key={border.cca3}
            className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out transform hover:scale-105"
            onClick={() => handleBorderClick(border.cca3)}
          >
            {border.name.common} {/* Display the name of the border country */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Borders;
