import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import ResultList from '@components/Results/ResultList/index';
import { customRender } from '@/test-utils/testUtils';
import { Provider } from 'react-redux';
import { store } from '@/app/lib/store';
import { charactersData } from '@/data/data';

describe('Result list render', () => {
  it('renders correct number of items when data is provided', () => {
    customRender(
      <Provider store={store}>
        <ResultList characters={charactersData} />
      </Provider>
    );
    const results = screen.getAllByTestId('result');
    expect(results).toHaveLength(3);
  });
  it('displays no results if array is empty', () => {
    customRender(
      <Provider store={store}>
        <ResultList characters={[]} />
      </Provider>
    );
    const results = screen.queryAllByTestId('result');
    expect(results).toHaveLength(0);
  });
  it('displays "no results" message when data array is not defined', () => {
    customRender(
      <Provider store={store}>
        <ResultList />
      </Provider>
    );
    expect(screen.getByText(/no results found/i)).toBeVisible();
  });
  it('displays item name and description correctly', () => {
    customRender(
      <Provider store={store}>
        <ResultList characters={charactersData} />
      </Provider>
    );
    const results = screen.queryAllByTestId('result');
    results.forEach((result, index) => {
      expect(result).toHaveTextContent(charactersData[index].name);
      expect(result).toHaveTextContent(charactersData[index].status);
      expect(result).toHaveTextContent(charactersData[index].species);
      expect(result).toHaveTextContent(charactersData[index].gender);
    });
  });
});
