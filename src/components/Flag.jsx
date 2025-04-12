import React from 'react';
import './Flag.css';

const Flag = ({ flagUrl }) => (
    <img src={flagUrl} alt="Flag" className="w-40 h-auto mb-4 rounded" />
  );
  
  export default Flag;
  