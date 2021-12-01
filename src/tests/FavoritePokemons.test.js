import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { FavoritePokemons } from '../components';
import PikachuObj from '../helpers/PikachuObj';

describe('03 - <FavoritePokemons.js />', () => {
  it('É exibido a mensagem se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);

    const hasFavorite = screen.getByText(/no favorite/i);

    expect(hasFavorite).toBeDefined();
  });

  it('É exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [PikachuObj] } />);

    const pikachu = screen.getByText(/pikachu/i);

    expect(pikachu).toBeInTheDocument();
  });
});
