import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryDetails from '../components/CountryDetails';

const Home = () => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get('https://nationnode.vercel.app/')
      .then(res => {
        const afghanistan = res.data.find(
          (c) => c.name.common === 'Afghanistan'
        );
        setCountry(afghanistan);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      {country ? <CountryDetails country={country} /> : <p>Loading...</p>}
    </div>
  );
};

export default Home;
