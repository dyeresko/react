import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import MyErrorBoundary from './MyErrorBoundary';
import MyError from './Results/MyError.tsx';
describe('Error boundary render', () => {
  it('catches and handles JavaScript errors in child components', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <MyErrorBoundary>
        <MyError error={true} />
      </MyErrorBoundary>
    );
    expect(screen.getByText('Something went wrong.')).toBeVisible();
  });
  it('render children in case of no errors', () => {
    render(
      <MyErrorBoundary>
        <MyError error={false} />
      </MyErrorBoundary>
    );
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();
  });
});

describe('error boundary console log', () => {
  it('logs error to console', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <MyErrorBoundary>
        <MyError error={true} />
      </MyErrorBoundary>
    );

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
