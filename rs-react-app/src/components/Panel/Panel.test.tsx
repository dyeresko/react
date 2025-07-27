import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { characterData } from '../../../test-utils/mockData.ts';
import Panel from './Panel.tsx';

describe('Result display', () => {
  it('correctly displays item names and descriptions', () => {
    render(
      <Panel
        id={characterData.id}
        name={characterData.name}
        status={characterData.status}
        species={characterData.species}
        type={characterData.type}
        gender={characterData.gender}
        image={characterData.image}
        origin={characterData.origin}
        location={characterData.location}
      />
    );
    expect(screen.getByText('Rick Sanchez')).toBeVisible();
    expect(screen.getByText('Citadel of Ricks')).toBeVisible();
    expect(screen.getByText('Earth (C-137)')).toBeVisible();
    const image = screen.getByTestId('image');

    expect(image).toHaveAttribute('src', characterData.image);
    expect(image).toHaveAttribute('alt', 'Result image');
  });
  it('handles missing or undefined data gracefully', () => {
    render(<Panel id={1} />);
    expect(screen.getByTestId('name')).toHaveTextContent('name is missing');
    expect(screen.getByTestId('status')).toHaveTextContent('status is missing');
    expect(screen.getByTestId('species')).toHaveTextContent(
      'species is missing'
    );
    expect(screen.getByTestId('gender')).toHaveTextContent('gender is missing');
    const image = screen.getByTestId('image');

    expect(image).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/640px-No_image_3x4.svg.png'
    );
    expect(image).toHaveAttribute('alt', 'Result image');
  });
});
