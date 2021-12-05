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

    const moreDetails = screen.getByRole('link', {
      name: /more details/i });

    userEvent.click(moreDetails);
  });

  it('As informações detalhadas do Pokémon selecionado são renderizadas.', () => {
    const CharDetails = screen.getByRole('heading', {
      name: /charmander details/i });
    expect(CharDetails).toBeInTheDocument();

    const moreDetails = screen.queryByRole('link', {
      name: /more details/i });
    expect(moreDetails).toBeFalsy();

    const summary = screen.getByRole('heading', {
      name: /summary/i });
    expect(summary).toBeInTheDocument();

    const paragraph = screen.getByText(
      /flame on its tail/i );
    expect(paragraph).toBeInTheDocument();
  });

  it('As informações sobre a localização são renderizadas.', () => {
    const totalLocations = 4;
    const src = 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png';

    const CharLocation = screen.getByRole('heading', {
      name: /game locations of charmander/i });
    expect(CharLocation).toBeInTheDocument();

    const locations = screen.getAllByAltText('Charmander location');
    expect(locations).toHaveLength(totalLocations);

    const firstLocationName = screen.getByText(/alola route 3/i);
    expect(firstLocationName).toBeInTheDocument();

    const thirdLocationName = screen.getByText(/kanto route 4/i);
    expect(thirdLocationName).toBeInTheDocument();

    expect(locations[0].src).toContain(src);
  });

  it('"Favorite things" renderizadas.', () => {
    const src = '/star-icon.svg';

    const favCheckBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i });

    userEvent.click(favCheckBox);

    const favStarImg = screen.getByRole('img', {
      name: /charmander is marked as favorite/i });
    expect(favStarImg.src).toContain(src);

    userEvent.click(favCheckBox);

    expect(favStarImg).not.toBeInTheDocument();
  });
});
