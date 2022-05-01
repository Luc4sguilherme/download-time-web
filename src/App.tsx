import { useState } from 'react';
import './App.css';

import {
  calculate,
  internetTypes,
  Unit,
  UnitSpeed,
} from './utils/converterUnits';

function App() {
  const [fileSizeValue, setFileSizeValue] = useState(0);
  const [ownSpeedValue, setOwnSpeedValue] = useState(0);
  const [fileSizeUnit, setFileSizeUnit] = useState('GB' as Unit);
  const [ownSpeedUnit, setOwnSpeedUnit] = useState('Mb/s' as UnitSpeed);

  return (
    <div className="container">
      <div className="file-size-controls">
        <input
          type="text"
          name="file-size-value"
          id="file-size-value"
          placeholder="File size"
          value={fileSizeValue}
          onChange={event => setFileSizeValue(Number(event.target.value))}
        />
        <div className="units-options">
          <span>
            <input
              type="radio"
              name="file-size"
              value="kB"
              checked={fileSizeUnit === ('kB' as Unit)}
              onChange={event => setFileSizeUnit(event.target.value as Unit)}
            />
            kB
          </span>
          <span>
            <input
              type="radio"
              name="file-size"
              value="MB"
              checked={fileSizeUnit === ('MB' as Unit)}
              onChange={event => setFileSizeUnit(event.target.value as Unit)}
            />
            MB
          </span>
          <span>
            <input
              type="radio"
              name="file-size"
              value="GB"
              checked={fileSizeUnit === ('GB' as Unit)}
              onChange={event => setFileSizeUnit(event.target.value as Unit)}
            />
            GB
          </span>
          <span>
            <input
              type="radio"
              name="file-size"
              value="TB"
              checked={fileSizeUnit === ('TB' as Unit)}
              onChange={event => setFileSizeUnit(event.target.value as Unit)}
            />
            TB
          </span>
        </div>
      </div>
      <div className="result-wrapper">
        <table className="result">
          <thead>
            <th>Connection Type</th>
            <th>Download Speed</th>
            <th>Download Time</th>
          </thead>
          <tbody>
            {internetTypes.map(internet => {
              const internetSpeed = internet.speed.split(' ');

              return (
                <tr>
                  <td>{internet.type}</td>
                  <td>{internet.speed}</td>
                  <td>
                    {fileSizeValue > 0 &&
                      calculate(
                        { value: fileSizeValue, unit: fileSizeUnit },
                        {
                          value: Number(internetSpeed[0]),
                          unit: internetSpeed[1] as UnitSpeed,
                        },
                      )}
                  </td>
                </tr>
              );
            })}

            <tr>
              <td>Own speed</td>
              <td className="own-speed-controls">
                <input
                  type="text"
                  name="own-speed"
                  id="own-speed"
                  placeholder="Own speed"
                  value={ownSpeedValue}
                  onChange={event =>
                    setOwnSpeedValue(Number(event.target.value))
                  }
                />
                <div className="units-options">
                  <span>
                    <input
                      type="radio"
                      name="download-speed"
                      value="kb/s"
                      checked={ownSpeedUnit === ('kb/s' as UnitSpeed)}
                      onChange={event =>
                        setOwnSpeedUnit(event.target.value as UnitSpeed)
                      }
                    />
                    kb/s
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="download-speed"
                      value="Mb/s"
                      checked={ownSpeedUnit === ('Mb/s' as UnitSpeed)}
                      onChange={event =>
                        setOwnSpeedUnit(event.target.value as UnitSpeed)
                      }
                    />
                    Mb/s
                  </span>
                  <span>
                    <input
                      type="radio"
                      name="download-speed"
                      value="Gb/s"
                      checked={ownSpeedUnit === ('Gb/s' as UnitSpeed)}
                      onChange={event =>
                        setOwnSpeedUnit(event.target.value as UnitSpeed)
                      }
                    />
                    Gb/s
                  </span>
                </div>
              </td>
              <td>
                {ownSpeedValue > 0 &&
                  calculate(
                    { value: fileSizeValue, unit: fileSizeUnit },
                    { value: ownSpeedValue, unit: ownSpeedUnit },
                  )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
