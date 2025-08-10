import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import MyError from '@components/Results/MyError/index';
describe('My Error', () => {
  it('throws error if error property is true', () => {
    expect(() => render(<MyError error={true} />)).toThrow(
      'Something went wrong.'
    );
  });
  it('render component if error property is false', () => {
    render(<MyError error={false} />);
    const errorDiv = screen.getByTestId('error');
    expect(errorDiv).toBeVisible();
  });
});
