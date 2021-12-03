import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('06 - <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i });

    userEvent.click(nextButton);
  });

  it('Card é renderizado com valores corretos.', () => {
    const CharName = screen.getByText(/charmander/i);
    expect(CharName).toBeInTheDocument();

    const PokeType = screen.getByTestId('pokemon-type');
    expect(PokeType.innerHTML).toBe('Fire');

    const weight = screen.getByText(/average weight: 8\.5 kg/i);
    expect(weight).toBeInTheDocument();
  });

  it('Card contem gif.', () => {
    const src = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';

    const img = screen.getByRole('img', { name: /charmander/i });
    expect(img.src).toContain(src);
  });

  it('Card contem More details.', () => {
    const src = '/pokemons/4';

    const link = screen.getByRole('link', {
      name: /more details/i });
    expect(link.href).toContain(src);
  });

  it('Clicar em More details redireciona corretamente.', () => {
    const link = screen.getByText(/more details/i);
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    const summary = screen.getByRole('heading', {
      name: /summary/i });
    expect(summary).toBeInTheDocument();
  });

  it('Ao favoritar pokémon, icone de favorito aparece no card.', () => {
    const src = '/star-icon.svg';

    const link = screen.getByText(/more details/i);

    userEvent.click(link);

    const favCheckBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i });

    userEvent.click(favCheckBox);

    const favStarImg = screen.getByRole('img', {
      name: /charmander is marked as favorite/i });
    expect(favStarImg.src).toContain(src);
  });
});
