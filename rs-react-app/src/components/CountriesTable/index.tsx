import { fetchData } from '@/api/api';
import { useStore } from '@/store/store';
import type { CO2Dataset } from '@/types/interfaces';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useRef, type FC } from 'react';
import Modal from '@/components/Modal';
import SelectColumns from '@/components/SelectColumns';
import SelectYears from '@/components/SelectYears';
import TableCell from '@/components/TableCell';
import SearchBar from '../SearchBar';
import SortCountries from '../SortCountries';
import React from 'react';

const CountriesTable: FC = () => {
  const { data } = useSuspenseQuery<CO2Dataset>({
    queryKey: ['co2data'],
    queryFn: fetchData,
  });

  const modal = useRef<HTMLDialogElement>(null);
  const countryToSearch = useStore((state) => state.countryToSearch);
  const showMethaneColumn = useStore((state) => state.showMethaneColumn);
  const showOilCo2Column = useStore((state) => state.showOilCo2Column);
  const showTemperatureChangeFromCo2Column = useStore(
    (state) => state.showTemperatureChangeFromCo2Column
  );
  const year = useStore((store) => store.newYear);
  const sortMethod = useStore((store) => store.sortCountries);

  const handleSelectColumnsClick = useCallback(() => {
    modal.current?.showModal();
  }, [modal]);

  const years = useMemo(
    () => Object.entries(data)[0][1].data.map((d) => d.year),
    [data]
  );
  const filteredCountries = useMemo(
    () => Object.entries(data).filter(([key]) => key.includes(countryToSearch)),
    [countryToSearch, data]
  );
  const sortedRows = useMemo(
    () =>
      filteredCountries.sort((a, b) =>
        sortMethod === 'desc'
          ? a[0].localeCompare(b[0])
          : b[0].localeCompare(a[0])
      ),
    [sortMethod, filteredCountries]
  );
  return (
    <>
      <SortCountries />
      <SearchBar />
      <SelectYears years={years} />
      <button onClick={handleSelectColumnsClick}>Select columns</button>
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
          {sortedRows.map(([key, value]) => (
            <tr key={key}>
              <th scope="row">{key}</th>
              <TableCell
                cellContent={
                  value.data.find((d) => d.year === year)?.population ?? 'N/A'
                }
              />
              <TableCell cellContent={value.iso_code ?? 'N/A'} />
              <TableCell cellContent={year} />
              <TableCell
                cellContent={
                  value.data.find((d) => d.year === year)?.co2 ?? 'N/A'
                }
              />

              <TableCell
                cellContent={
                  value.data.find((d) => d.year === year)?.co2_per_capita ??
                  'N/A'
                }
              />
              {showMethaneColumn ? (
                <TableCell
                  cellContent={
                    value.data.find((d) => d.year === year)?.methane ?? 'N/A'
                  }
                />
              ) : null}
              {showOilCo2Column ? (
                <TableCell
                  cellContent={
                    value.data.find((d) => d.year === year)?.oil_co2 ?? 'N/A'
                  }
                />
              ) : null}
              {showTemperatureChangeFromCo2Column ? (
                <TableCell
                  cellContent={
                    value.data.find((d) => d.year === year)
                      ?.temperature_change_from_co2 ?? 'N/A'
                  }
                />
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal modalDialogRef={modal}>
        <SelectColumns />
      </Modal>
    </>
  );
};

export default CountriesTable;
