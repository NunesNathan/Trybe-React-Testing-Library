import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../components';

describe('02 - About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Página contém as informações sobre a Pokédex',
    () => {
      const heading = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i });
      expect(heading).toBeInTheDocument();
    });

  it('Página contém um heading h2 com o texto About Pokédex',
    () => {
      const heading = screen.getByRole('heading', {
        level: 2,
        name: /about/i });
      expect(heading).toBeInTheDocument();
    });

  it('Página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      const p1 = screen.getByText(/simulates a pokédex/i);
      expect(p1).toBeInTheDocument();
      const p2 = screen.getByText(/Pokémons by type/i);
      expect(p2).toBeInTheDocument();
    });
  it('Página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      // img.src ref https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
      const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

      const img = screen.getByRole('img', { name: /pokédex/i });
      expect(img.src).toContain(src);
    });
});
