import './CountrySelector.css';

/**
 * Simple country selector component
 * TODO: Replace with react-select for better UX
 */
export function CountrySelector({ countries, value, onChange, label = 'Select Country' }) {
  const selectedCountry = countries.find(c => c.code === value);

  return (
    <div className="country-selector">
      <label className="country-selector-label">{label}</label>
      <select
        className="country-selector-dropdown"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select --</option>
        {countries
          .filter(c => c.volumes && c.volumes.total) // Only show countries with data
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(country => (
            <option key={country.code} value={country.code}>
              {country.name} ({country.code})
            </option>
          ))}
      </select>
      {selectedCountry && (
        <div className="country-selector-population">
          Population: {selectedCountry.population?.toLocaleString() || 'N/A'}
        </div>
      )}
    </div>
  );
}

