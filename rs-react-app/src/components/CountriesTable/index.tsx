import { fetchData } from '@/api/api';
import type { CO2Dataset } from '@/types/interfaces';
import { useSuspenseQuery } from '@tanstack/react-query';
import { type FC } from 'react';

const CountriesTable: FC = () => {
  const { data } = useSuspenseQuery<CO2Dataset>({
    queryKey: ['co2data'],
    queryFn: fetchData,
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Year</th>
            <th scope="col">Population</th>
            <th scope="col">ISO code</th>
            <th scope="col">co2</th>
            <th scope="col">co2_per_capita</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <th scope="row">{key}</th>
              <td>{value.data[value.data.length - 1].year}</td>
              <td>{value.data[value.data.length - 1].population ?? 'N/A'}</td>
              <td>{value.iso_code ?? 'N/A'}</td>
              <td>{value.data[value.data.length - 1].co2 ?? 'N/A'}</td>
              <td>
                {value.data[value.data.length - 1].co2_per_capita ?? 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CountriesTable;
