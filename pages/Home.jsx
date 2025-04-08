import axios from 'axios';
import { Country } from '../types';

const API_BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountryData = async (countryCode?: string): Promise<Country[]> => {
  try {
    const url = countryCode ? `${API_BASE_URL}/alpha/${countryCode}` : `${API_BASE_URL}/all`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
};

export const fetchCountryByName = async (name: string): Promise<Country[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
};