import { getCategoryColor } from '../../utils/scaling';

/**
 * Statistics panel showing consumption breakdown for selected country(ies)
 */
export function StatisticsPanel({ countryData, isComparison = false }) {
  if (!countryData) {
    return (
      <div className="statistics-panel">
        <div className="statistics-placeholder">
          <p>Select a country to view consumption statistics</p>
        </div>
      </div>
    );
  }

  const countries = Array.isArray(countryData) ? countryData : [countryData];

  return (
    <div className="statistics-panel">
      <div className="statistics-header">
        <h2>Consumption Statistics</h2>
        {!isComparison && countryData && (
          <div className="statistics-year">
            Year: {countryData.year || '2023'}
          </div>
        )}
      </div>

      <div className="statistics-content">
        {countries.map((country, idx) => (
          <div key={country.code || idx} className="country-stats">
            {isComparison && (
              <h3 className="country-name">{country.name} ({country.code})</h3>
            )}
            
            {country.population && (
              <div className="stat-item">
                <span className="stat-label">Population:</span>
                <span className="stat-value">
                  {country.population.toLocaleString()}
                </span>
              </div>
            )}

            {country.volumes && (
              <>
                <div className="stat-divider" />
                <div className="volumes-list">
                  {country.volumes.water !== null && country.volumes.water !== undefined && (
                    <div className="volume-item">
                      <div className="volume-header">
                        <span 
                          className="volume-color" 
                          style={{ backgroundColor: getCategoryColor('water') }}
                        />
                        <span className="volume-label">Water</span>
                      </div>
                      <span className="volume-value">
                        {country.volumes.water.toFixed(2)} m³/year
                      </span>
                    </div>
                  )}

                  {country.volumes.energy !== null && country.volumes.energy !== undefined && (
                    <div className="volume-item">
                      <div className="volume-header">
                        <span 
                          className="volume-color" 
                          style={{ backgroundColor: getCategoryColor('energy') }}
                        />
                        <span className="volume-label">Energy (Battery)</span>
                      </div>
                      <span className="volume-value">
                        {country.volumes.energy.toFixed(2)} m³/year
                      </span>
                    </div>
                  )}

                  {country.volumes.concrete !== null && country.volumes.concrete !== undefined && (
                    <div className="volume-item">
                      <div className="volume-header">
                        <span 
                          className="volume-color" 
                          style={{ backgroundColor: getCategoryColor('concrete') }}
                        />
                        <span className="volume-label">Concrete</span>
                      </div>
                      <span className="volume-value">
                        {country.volumes.concrete.toFixed(4)} m³/year
                      </span>
                    </div>
                  )}

                  {country.volumes.food !== null && country.volumes.food !== undefined && (
                    <div className="volume-item">
                      <div className="volume-header">
                        <span 
                          className="volume-color" 
                          style={{ backgroundColor: getCategoryColor('food') }}
                        />
                        <span className="volume-label">Food</span>
                      </div>
                      <span className="volume-value">
                        {country.volumes.food.toFixed(2)} m³/year
                      </span>
                    </div>
                  )}

                  {country.volumes.waste !== null && country.volumes.waste !== undefined && (
                    <div className="volume-item">
                      <div className="volume-header">
                        <span 
                          className="volume-color" 
                          style={{ backgroundColor: getCategoryColor('waste') }}
                        />
                        <span className="volume-label">Waste</span>
                      </div>
                      <span className="volume-value">
                        {country.volumes.waste.toFixed(2)} m³/year
                      </span>
                    </div>
                  )}

                  {country.volumes.total !== null && country.volumes.total !== undefined && (
                    <>
                      <div className="stat-divider" />
                      <div className="volume-item total">
                        <div className="volume-header">
                          <span className="volume-label">Total Consumption</span>
                        </div>
                        <span className="volume-value total-value">
                          {country.volumes.total.toFixed(2)} m³/year
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

