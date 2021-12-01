import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { NotFound } from '../components';

describe('04 - <NotFound.js />', () => {
  it('Página é renderizada.', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', { name: /page requested/i, level: 2 });

    expect(h2).toBeDefined();
  });

  it('Página contém gif.', () => {
    renderWithRouter(<NotFound />);

    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const img = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(img.src).toContain(src);
  });
});
