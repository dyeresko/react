import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { getPage, charactersToCSV, simulateLoading } from '@/utils/utils';
import {
  invalidTestInfo,
  testInfo,
  testInfoNext,
  detailedCharactersData,
  csvResult,
} from '@/test-utils/mockData';

describe('Utils tests', () => {
  it('gets the correct page', () => {
    const page = getPage(testInfoNext);
    expect(page).toBe(1);
  });
  it('gets the correct page', () => {
    const page = getPage(testInfo);
    expect(page).toBe(2);
  });
  it('gets the correct page', () => {
    const page = getPage(invalidTestInfo);
    expect(page).toBe(1);
  });
  it('converts characters to svg', () => {
    const result = charactersToCSV(detailedCharactersData);
    expect(result).toBe(csvResult);
  });
  it('waits 200ms', async () => {
    const dateNow = Date.now();
    await simulateLoading();
    const elapsedTime = Date.now() - dateNow;
    expect(elapsedTime).toBeGreaterThanOrEqual(200);
  });
});
