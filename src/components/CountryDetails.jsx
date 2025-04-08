import React from 'react';
import Flag from './Flag';
import Borders from './Borders';

const CountryDetails = ({ country, onBorderClick }) => {
  // const {
  //   name,
  //   capital,
  //   region,
  //   subregion,
  //   population,
  //   area,
  //   latlng,
  //   timezones,
  //   currencies,
  //   languages,
  //   flags,
  //   borders,
  // } = country;

  // Format currencies with the symbol, if available
  const formattedCurrencies = currencies
    ? Object.values(currencies).map((c) => {
        const symbol = c.symbol ? `(${c.symbol})` : '';
        return `${c.name} ${symbol}`;
      })
    : [];

  // Get the list of languages
  const formattedLanguages = languages ? Object.values(languages) : [];

  return (
    <div className="country-details">
      <div className="row">
        <div className="col-md-4">
          <Flag flag={flags} />
        </div>
        <div className="col-md-8">
          <h2>{name.common}</h2>
          <p><strong>Official Name:</strong> {name.official || 'N/A'}</p>
          <p><strong>Capital:</strong> {capital?.length ? capital.join(', ') : 'N/A'}</p>
          <p><strong>Region:</strong> {region || 'N/A'}</p>
          <p><strong>Subregion:</strong> {subregion || 'N/A'}</p>
          <p><strong>Population:</strong> {population.toLocaleString()}</p>
          <p><strong>Area:</strong> {area.toLocaleString()} km²</p>
          <p><strong>Coordinates:</strong> {latlng.join(', ')}</p>
          <p><strong>Timezones:</strong> {timezones.join(', ')}</p>
          <p><strong>Currency:</strong> {formattedCurrencies.length ? formattedCurrencies.join(', ') : 'N/A'}</p>
          <p><strong>Languages:</strong> {formattedLanguages.length ? formattedLanguages.join(', ') : 'N/A'}</p>
        </div>
      </div>
      {/* Display borders if available */}
      {borders && borders.length > 0 && (
        <Borders borders={borders} onBorderClick={onBorderClick} />
      )}
    </div>
  );
};

export default CountryDetails;
