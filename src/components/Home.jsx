import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scene } from './Scene';
import { CountrySelector } from './ui/CountrySelector';
import { StatisticsPanel } from './ui/StatisticsPanel';
import { useConsumptionData, getCountryData, getComparisonData } from '../hooks/useConsumptionData';

export function Home() {
  const { data, loading, error } = useConsumptionData();
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonCountries, setComparisonCountries] = useState(['USA', 'CHN']);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Loading consumption data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h2>Error loading data</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No data available</h2>
      </div>
    );
  }

  // Get country data for display
  let sceneData = null;
  if (comparisonMode) {
    // Comparison mode: multiple countries in same scene
    sceneData = getComparisonData(data, comparisonCountries);
  } else {
    // Single country mode
    sceneData = getCountryData(data, selectedCountry);
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Human Consumption Atlas</h1>
          
          {/* Navigation Link */}
          <Link to="/calculations" className="calculations-link">
            📊 Data Sources & Calculations
          </Link>
          
          {/* Mode toggle */}
          <div className="mode-toggle">
            <label className={`mode-option ${!comparisonMode ? 'active' : ''}`}>
              <input
                type="radio"
                name="mode"
                checked={!comparisonMode}
                onChange={() => setComparisonMode(false)}
              />
              <span>Single Country</span>
            </label>
            <label className={`mode-option ${comparisonMode ? 'active' : ''}`}>
              <input
                type="radio"
                name="mode"
                checked={comparisonMode}
                onChange={() => setComparisonMode(true)}
              />
              <span>Comparison Mode</span>
            </label>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="app-main">
        {/* Left Panel: Controls */}
        <aside className="controls-panel">
          <div className="controls-content">
            {/* Country selector(s) */}
            {!comparisonMode ? (
              <CountrySelector
                countries={data.data}
                value={selectedCountry}
                onChange={setSelectedCountry}
                label="Select Country"
              />
            ) : (
              <div className="comparison-selectors">
                {comparisonCountries.map((code, index) => (
                  <CountrySelector
                    key={index}
                    countries={data.data}
                    value={code}
                    onChange={(newCode) => {
                      const updated = [...comparisonCountries];
                      updated[index] = newCode;
                      setComparisonCountries(updated);
                    }}
                    label={`Country ${index + 1}`}
                  />
                ))}
                {comparisonCountries.length < 3 && (
                  <button
                    className="add-country-btn"
                    onClick={() => setComparisonCountries([...comparisonCountries, 'IND'])}
                  >
                    + Add Country
                  </button>
                )}
                {comparisonCountries.length > 2 && (
                  <button
                    className="remove-country-btn"
                    onClick={() => {
                      const updated = [...comparisonCountries];
                      updated.pop();
                      setComparisonCountries(updated);
                    }}
                  >
                    − Remove Country
                  </button>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Center: 3D Scene */}
        <main className="scene-container">
          {sceneData && <Scene countryData={sceneData} />}
        </main>

        {/* Right Panel: Statistics */}
        <aside className="statistics-panel-wrapper">
          <StatisticsPanel 
            countryData={sceneData} 
            isComparison={comparisonMode}
          />
        </aside>
      </div>
    </div>
  );
}

