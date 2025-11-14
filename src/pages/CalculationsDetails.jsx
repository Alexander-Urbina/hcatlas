import { Link } from 'react-router-dom';
import './CalculationsDetails.css';

export function CalculationsDetails() {
  return (
    <div className="calculations-details">
      <header className="details-header">
        <Link to="/" className="back-link">← Back to Visualization</Link>
        <h1>Data Sources & Calculation Methods</h1>
        <p className="subtitle">How we convert raw data into 3D visualizations</p>
      </header>

      <div className="details-content">
        <section className="intro-section">
          <h2>Overview</h2>
          <p>
            All consumption data is converted to <strong>cubic meters per capita per year (m³/capita/year)</strong> 
            to enable proportional 3D visualization. This document explains the data sources, original units, 
            and step-by-step conversion calculations.
          </p>
          <p>
            <strong>Example Country:</strong> We'll use <strong>China (CHN)</strong> as a detailed example 
            throughout this document.
          </p>
        </section>

        {/* Water Section */}
        <section className="category-section">
          <h2>1. Water 💧</h2>
          
          <div className="source-info">
            <h3>Data Source</h3>
            <ul>
              <li><strong>Primary Source:</strong> World Bank DataBank</li>
              <li><strong>Indicator:</strong> ER.H2O.FWTL.K3.PC (Freshwater withdrawal, total per capita)</li>
              <li><strong>URL:</strong> <a href="https://databank.worldbank.org/" target="_blank" rel="noopener noreferrer">https://databank.worldbank.org/</a></li>
              <li><strong>Coverage:</strong> 1990-2023, ~180 countries</li>
              <li><strong>Original Unit:</strong> Cubic meters per capita per year (m³/capita/year)</li>
            </ul>
          </div>

          <div className="processing-info">
            <h3>Data Processing</h3>
            <p>
              <strong>Important:</strong> The World Bank data provides <strong>total freshwater withdrawal</strong>, 
              which includes agricultural (~70-90%), industrial (~10-20%), and domestic/municipal (~5-15%) use.
            </p>
            <p>
              For this visualization, we need <strong>domestic/municipal water consumption only</strong> 
              (water used in homes and cities). We estimate this by applying sectoral breakdown percentages 
              based on FAO AQUASTAT patterns and UN-Water sectoral data.
            </p>
          </div>

          <div className="calculation-steps">
            <h3>Calculation Steps (Example: China)</h3>
            
            <div className="step">
              <h4>Step 1: Get Total Water Withdrawal</h4>
              <div className="calculation-box">
                <p><strong>Source:</strong> World Bank DataBank (2022)</p>
                <p><strong>China Total Water Withdrawal:</strong> 402.56 m³/capita/year</p>
              </div>
            </div>

            <div className="step">
              <h4>Step 2: Apply Domestic Percentage</h4>
              <p>
                China's domestic water percentage: <strong>18%</strong> (based on sectoral breakdown analysis)
              </p>
              <div className="calculation-box">
                <p><strong>Formula:</strong> Domestic Water = Total × Domestic Percentage</p>
                <p className="formula">
                  Domestic Water = 402.56 m³/year × 0.18 = <strong>72.46 m³/capita/year</strong>
                </p>
              </div>
            </div>

            <div className="step">
              <h4>Step 3: Convert to Liters per Day (for reference)</h4>
              <div className="calculation-box">
                <p><strong>Conversion:</strong> 1 m³ = 1,000 liters</p>
                <p className="formula">
                  Annual: 72.46 m³/year × 1,000 L/m³ = 72,460 L/year
                </p>
                <p className="formula">
                  Daily: 72,460 L/year ÷ 365.25 days = <strong>198.4 L/capita/day</strong>
                </p>
              </div>
              <p className="note">
                ✓ This value (198.4 L/day) is within the expected range of 150-200 L/day for China's 
                domestic water consumption (based on WHO, UN-Water, and national statistics).
              </p>
            </div>

            <div className="step">
              <h4>Step 4: Final Value for Visualization</h4>
              <div className="calculation-box result">
                <p><strong>Final Value:</strong> 72.46 m³/capita/year</p>
                <p>This is the value used in the 3D visualization.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Energy Section */}
        <section className="category-section">
          <h2>2. Energy (Battery Equivalent) 🔋</h2>
          
          <div className="source-info">
            <h3>Data Source</h3>
            <ul>
              <li><strong>Primary Source:</strong> World Bank DataBank</li>
              <li><strong>Indicator:</strong> EG.ELC.USPC.KH.PC (Electric power consumption per capita, kWh)</li>
              <li><strong>URL:</strong> <a href="https://databank.worldbank.org/" target="_blank" rel="noopener noreferrer">https://databank.worldbank.org/</a></li>
              <li><strong>Coverage:</strong> 1990-2023, ~200 countries</li>
              <li><strong>Original Unit:</strong> Kilowatt-hours per capita per year (kWh/capita/year)</li>
              <li><strong>Note:</strong> Residential/household electricity consumption only</li>
            </ul>
          </div>

          <div className="calculation-steps">
            <h3>Calculation Steps (Example: China)</h3>
            
            <div className="step">
              <h4>Step 1: Get Annual Electricity Consumption</h4>
              <div className="calculation-box">
                <p><strong>Source:</strong> World Bank DataBank (2022)</p>
                <p><strong>China Annual Electricity:</strong> ~1,000 kWh/capita/year</p>
              </div>
            </div>

            <div className="step">
              <h4>Step 2: Calculate Daily Consumption</h4>
              <div className="calculation-box">
                <p className="formula">
                  Daily Energy = 1,000 kWh/year ÷ 365.25 days = <strong>2.74 kWh/capita/day</strong>
                </p>
              </div>
            </div>

            <div className="step">
              <h4>Step 3: Convert to Battery Volume</h4>
              <p>
                <strong>Battery Energy Density:</strong> 100 kWh/m³ (based on Tesla Powerwall and modern Li-ion batteries)
              </p>
              <div className="calculation-box">
                <p><strong>Formula:</strong> Battery Volume = Daily Energy ÷ Energy Density</p>
                <p className="formula">
                  Battery Volume = 2.74 kWh/day ÷ 100 kWh/m³ = <strong>0.0274 m³/day</strong>
                </p>
              </div>
            </div>

            <div className="step">
              <h4>Step 4: Convert to Annual Volume</h4>
              <div className="calculation-box">
                <p className="formula">
                  Annual Battery Volume = 0.0274 m³/day × 365.25 days = <strong>10.0 m³/capita/year</strong>
                </p>
              </div>
            </div>

            <div className="step">
              <h4>Step 5: Final Value for Visualization</h4>
              <div className="calculation-box result">
                <p><strong>Final Value:</strong> ~10.0 m³/capita/year</p>
                <p>This represents the physical volume of batteries needed to store daily energy consumption.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Concrete Section */}
        <section className="category-section">
          <h2>3. Concrete 🏗️</h2>
          
          <div className="source-info">
            <h3>Data Source</h3>
            <ul>
              <li><strong>Primary Source:</strong> USGS (United States Geological Survey)</li>
              <li><strong>Coverage:</strong> Cement production data, 2000-2023, ~100 countries</li>
              <li><strong>URL:</strong> <a href="https://www.usgs.gov/centers/nmic/" target="_blank" rel="noopener noreferrer">https://www.usgs.gov/centers/nmic/</a></li>
              <li><strong>Original Unit:</strong> Cement production (thousand metric tons)</li>
            </ul>
          </div>

          <div className="calculation-steps">
            <h3>Calculation Steps (Example: China)</h3>
            
            <div className="step">
              <h4>Step 1: Get Cement Production</h4>
              <div className="calculation-box">
                <p><strong>Source:</strong> USGS Minerals Yearbook (2022)</p>
                <p><strong>China Cement Production:</strong> ~2.1 billion metric tons/year</p>
              </div>
            </div>

            <div className="step">
              <h4>Step 2: Convert Cement to Concrete</h4>
              <p>
                <strong>Conversion Ratio:</strong> ~350 kg cement per m³ concrete (standard mix)
              </p>
              <div className="calculation-box">
                <p className="formula">
                  Concrete Volume = Cement Mass ÷ Cement Density ÷ Cement Ratio
                </p>
                <p className="formula">
                  Concrete = 2.1 billion tons ÷ 1,500 kg/m³ ÷ 350 kg/m³ = <strong>4.0 billion m³/year</strong>
                </p>
              </div>
            </div>

            <div className="step">
              <h4>Step 3: Calculate Per Capita</h4>
              <div className="calculation-box">
                <p><strong>China Population (2022):</strong> ~1.41 billion</p>
                <p className="formula">
                  Per Capita = 4.0 billion m³/year ÷ 1.41 billion people = <strong>2.84 m³/capita/year</strong>
                </p>
              </div>
            </div>

            <div className="step">
              <h4>Step 4: Final Value for Visualization</h4>
              <div className="calculation-box result">
                <p><strong>Final Value:</strong> ~2.84 m³/capita/year</p>
                <p>This represents the concrete volume consumed per person per year.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Food Section */}
        <section className="category-section">
          <h2>4. Food 🍽️</h2>
          
          <div className="source-info">
            <h3>Data Source</h3>
            <ul>
              <li><strong>Primary Source:</strong> FAO (Food and Agriculture Organization) FAOSTAT</li>
              <li><strong>URL:</strong> <a href="https://www.fao.org/faostat/" target="_blank" rel="noopener noreferrer">https://www.fao.org/faostat/</a></li>
              <li><strong>Coverage:</strong> 1961-2023, ~180 countries</li>
              <li><strong>Original Unit:</strong> Kilograms per capita per year (kg/capita/year)</li>
              <li><strong>Note:</strong> Total food consumption (animal + vegetable products)</li>
            </ul>
          </div>

          <div className="calculation-steps">
            <h3>Calculation Steps (Example: China)</h3>
            
            <div className="step">
              <h4>Step 1: Get Food Consumption</h4>
              <div className="calculation-box">
                <p><strong>Source:</strong> FAO Food Balance Sheets (2022)</p>
                <p><strong>China Food Consumption:</strong> ~430 kg/capita/year</p>
              </div>
            </div>

            <div className="step">
              <h4>Step 2: Convert to Volume</h4>
              <p>
                <strong>Food Density:</strong> Average food density = 1,000 kg/m³ (mixed diet average from USDA, FAO)
              </p>
              <div className="calculation-box">
                <p><strong>Formula:</strong> Food Volume = Food Mass ÷ Food Density</p>
                <p className="formula">
                  Food Volume = 430 kg/year ÷ 1,000 kg/m³ = <strong>0.43 m³/capita/year</strong>
                </p>
              </div>
            </div>

            <div className="step">
              <h4>Step 3: Final Value for Visualization</h4>
              <div className="calculation-box result">
                <p><strong>Final Value:</strong> 0.43 m³/capita/year</p>
                <p>This represents the volume of food consumed per person per year.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Waste Section */}
        <section className="category-section">
          <h2>5. Waste 🗑️</h2>
          
          <div className="source-info">
            <h3>Data Source</h3>
            <ul>
              <li><strong>Primary Source:</strong> World Bank "What a Waste" Database</li>
              <li><strong>URL:</strong> <a href="https://datatopics.worldbank.org/what-a-waste/" target="_blank" rel="noopener noreferrer">https://datatopics.worldbank.org/what-a-waste/</a></li>
              <li><strong>Coverage:</strong> 2010-2023, ~200 countries</li>
              <li><strong>Original Unit:</strong> Kilograms per capita per year (kg/capita/year)</li>
              <li><strong>Note:</strong> Municipal solid waste generation</li>
            </ul>
          </div>

          <div className="calculation-steps">
            <h3>Calculation Steps (Example: China)</h3>
            
            <div className="step">
              <h4>Step 1: Get Waste Generation</h4>
              <div className="calculation-box">
                <p><strong>Source:</strong> World Bank What a Waste Database (2022)</p>
                <p><strong>China Waste Generation:</strong> ~280 kg/capita/year</p>
              </div>
            </div>

            <div className="step">
              <h4>Step 2: Convert to Volume</h4>
              <p>
                <strong>Waste Density:</strong> Average waste density = 2,000 kg/m³ 
                (compacted municipal solid waste, based on World Bank and EPA data)
              </p>
              <div className="calculation-box">
                <p><strong>Formula:</strong> Waste Volume = Waste Mass ÷ Waste Density</p>
                <p className="formula">
                  Waste Volume = 280 kg/year ÷ 2,000 kg/m³ = <strong>0.14 m³/capita/year</strong>
                </p>
              </div>
            </div>

            <div className="step">
              <h4>Step 3: Final Value for Visualization</h4>
              <div className="calculation-box result">
                <p><strong>Final Value:</strong> 0.14 m³/capita/year</p>
                <p>This represents the volume of waste generated per person per year.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section className="summary-section">
          <h2>Summary: China Example</h2>
          <div className="summary-table">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Source</th>
                  <th>Original Value</th>
                  <th>Final Value (m³/year)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Water</td>
                  <td>World Bank</td>
                  <td>402.56 m³/year (total)</td>
                  <td>72.46 m³/year</td>
                </tr>
                <tr>
                  <td>Energy</td>
                  <td>World Bank</td>
                  <td>1,000 kWh/year</td>
                  <td>~10.0 m³/year</td>
                </tr>
                <tr>
                  <td>Concrete</td>
                  <td>USGS</td>
                  <td>2.1 billion tons cement</td>
                  <td>~2.84 m³/year</td>
                </tr>
                <tr>
                  <td>Food</td>
                  <td>FAO</td>
                  <td>430 kg/year</td>
                  <td>0.43 m³/year</td>
                </tr>
                <tr>
                  <td>Waste</td>
                  <td>World Bank</td>
                  <td>280 kg/year</td>
                  <td>0.14 m³/year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* References */}
        <section className="references-section">
          <h2>References</h2>
          <ul>
            <li>World Bank DataBank: <a href="https://databank.worldbank.org/" target="_blank" rel="noopener noreferrer">https://databank.worldbank.org/</a></li>
            <li>FAO AQUASTAT: <a href="https://www.fao.org/aquastat/" target="_blank" rel="noopener noreferrer">https://www.fao.org/aquastat/</a></li>
            <li>FAO FAOSTAT: <a href="https://www.fao.org/faostat/" target="_blank" rel="noopener noreferrer">https://www.fao.org/faostat/</a></li>
            <li>USGS Minerals Information: <a href="https://www.usgs.gov/centers/nmic/" target="_blank" rel="noopener noreferrer">https://www.usgs.gov/centers/nmic/</a></li>
            <li>World Bank What a Waste: <a href="https://datatopics.worldbank.org/what-a-waste/" target="_blank" rel="noopener noreferrer">https://datatopics.worldbank.org/what-a-waste/</a></li>
            <li>Volume Conversion Ratios Documentation: See <code>VOLUME_CONVERSION_RATIOS.md</code> in project repository</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

