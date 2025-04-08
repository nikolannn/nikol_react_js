import React, { useState, useEffect } from 'react';
import { fetchCountData } from '../pages/Home.jsx';

const Borders = ({ borders, onBorderClick }) => {
  const [borderCountries, setBorderCountries] = useState([]);

  // This useEffect fetches the border country data when the 'borders' array changes.
  useEffect(() => {
    const fetchCountData = async () => {
      if (borders && borders.length > 0) {
        // We map over the borders and fetch data for each border country.
        const borderDataPromises = borders.map(async (borderCode) => {
          const response = await fetch(`https://nationnode.vercel.app/api/v1/countries/${borderCode}`);
          const data = await response.json();
          return data[0]; // Return the first country data object from the response
        });

        // Wait for all the promises to resolve and set the state with the border countries
        const borderData = await Promise.all(borderDataPromises);
        setBorderCountries(borderData);
      }
    };

    fetchCountData();
  }, [borders]); // Only run this effect when the 'borders' prop changes.

  return (
    <div className="borders-container">
      <h5>Borders:</h5>
      <ul className="list-unstyled">
        {/* Loop through the fetched border countries and display them */}
        {borderCountries.map((country) => (
          <li key={country.cca3} className="border-item">
            {/* Button that calls the onBorderClick handler when clicked */}
            <button
              className="btn btn-link"
              onClick={() => onBorderClick && onBorderClick(country.cca3)}
            >
              {country.name.common} {/* Display the common name of the country */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Borders;
