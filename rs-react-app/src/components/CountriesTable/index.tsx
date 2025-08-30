import { fetchData } from '@/api/api';
import { useStore } from '@/store/store';
import type { CO2Dataset } from '@/types/interfaces';
import { useSuspenseQuery } from '@tanstack/react-query';
import { type FC } from 'react';

const CountriesTable: FC = () => {
  const { data } = useSuspenseQuery<CO2Dataset>({
    queryKey: ['co2data'],
    queryFn: fetchData,
  });

  const showMethaneColumn = useStore((state) => state.showMethaneColumn);
  const showOilCo2Column = useStore((state) => state.showOilCo2Column);
  console.log(showOilCo2Column);
  const showTemperatureChangeFromCo2Column = useStore(
    (state) => state.showTemperatureChangeFromCo2Column
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Population</th>
            <th scope="col">ISO code</th>
            <th scope="col">Year</th>
            <th scope="col">co2</th>
            <th scope="col">co2_per_capita</th>
            {showMethaneColumn ? <th scope="col">methane</th> : null}
            {showOilCo2Column ? <th scope="col">oil_co2</th> : null}
            {showTemperatureChangeFromCo2Column ? (
              <th scope="col">temperature_change_from_co2</th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <th scope="row">{key}</th>
              <td>{value.data[value.data.length - 1].population ?? 'N/A'}</td>
              <td>{value.iso_code ?? 'N/A'}</td>
              <td>{value.data[value.data.length - 1].year}</td>
              <td>{value.data[value.data.length - 1].co2 ?? 'N/A'}</td>
              <td>
                {value.data[value.data.length - 1].co2_per_capita ?? 'N/A'}
              </td>
              {showMethaneColumn ? (
                <td>{value.data[value.data.length - 1].methane ?? 'N/A'}</td>
              ) : null}
              {showOilCo2Column ? (
                <td>{value.data[value.data.length - 1].oil_co2 ?? 'N/A'}</td>
              ) : null}
              {showTemperatureChangeFromCo2Column ? (
                <td>
                  {value.data[value.data.length - 1]
                    .temperature_change_from_co2 ?? 'N/A'}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CountriesTable;
