import { useStore } from '@/store/store';
import type { FC } from 'react';

const SelectColumns: FC = () => {
  const setShowMethaneColumn = useStore((state) => state.setShowMethaneColumn);
  const setShowOilCo2Column = useStore((state) => state.setShowOilCo2Column);
  const setShowTemperatureChangeFromCo2Column = useStore(
    (state) => state.setShowTemperatureChangeFromCo2Column
  );

  const handleMethaneCheckboxChange = () => {
    setShowMethaneColumn();
  };

  const handleOilCo2CheckboxChange = () => {
    setShowOilCo2Column();
  };

  const handleTemperatureChangeFromCo2ColumnCheckboxChange = () => {
    setShowTemperatureChangeFromCo2Column();
  };

  return (
    <form>
      <div>
        <label>
          <input checked disabled id="year" type="checkbox" name="year" />
          <label htmlFor="year">Year</label>
        </label>
      </div>
      <div>
        <label>
          <input
            checked
            disabled
            id="population"
            type="checkbox"
            name="population"
          />
          <label htmlFor="population">Population</label>
        </label>
      </div>
      <div>
        <label>
          <input checked disabled id="co2" type="checkbox" name="co2" />
          <label htmlFor="co2">co2</label>
        </label>
      </div>
      <div>
        <label>
          <input
            checked
            disabled
            id="co2_per_capita"
            type="checkbox"
            name="co2_per_capita"
          />
          <label htmlFor="co2_per_capita">co2 per capita</label>
        </label>
      </div>
      <div>
        <label>
          <input
            onChange={handleMethaneCheckboxChange}
            id="methane"
            type="checkbox"
            name="methane"
          />
          <label htmlFor="methane">Methane</label>
        </label>
      </div>
      <div>
        <label>
          <input
            onChange={handleOilCo2CheckboxChange}
            id="oil_co2"
            type="checkbox"
            name="oil_co2"
          />
          <label htmlFor="accept">Oil co2</label>
        </label>
      </div>
      <div>
        <label>
          <input
            id="temperature_change_from_co2"
            type="checkbox"
            name="temperature_change_from_co2"
            onChange={handleTemperatureChangeFromCo2ColumnCheckboxChange}
          />
          <label htmlFor="temperature_change_from_co2">
            Temperature change from co2
          </label>
        </label>
      </div>
    </form>
  );
};

export default SelectColumns;
