import { useState, useEffect } from 'react';
import consumptionData from '../data/consumption-data.json';

/**
 * Hook to load and access consumption data
 */
export function useConsumptionData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Data is already imported, just set it
      setData(consumptionData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}

/**
 * Get country data by code
 * @param {string} countryCode - ISO 3-letter country code
 * @returns {object|null} Country data object
 */
export function getCountryData(data, countryCode) {
  if (!data || !data.data) return null;
  return data.data.find(c => c.code === countryCode) || null;
}

/**
 * Get multiple countries for comparison
 * @param {Array<string>} countryCodes - Array of ISO country codes
 * @returns {Array<object>} Array of country data objects
 */
export function getComparisonData(data, countryCodes) {
  if (!data || !data.data) return [];
  return countryCodes
    .map(code => data.data.find(c => c.code === code))
    .filter(Boolean); // Remove null/undefined
}

