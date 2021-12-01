import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { Pokedex } from '../components';
import PokemonObj from '../helpers/PokemonObj';

describe('05 - <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ PokemonObj }
      isPokemonFavoriteById={ { id: true } }
    />);
  });

  it('Página é renderizada.', () => {
    const h2 = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });

    expect(h2).toBeDefined();
  });

  it('Proximo pokemon é exibido, mantendo o botão all na tela.', () => {
    const PikaName = screen.getByText(/pikachu/i);
    expect(PikaName).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /próximo pokémon/i });

    userEvent.click(button);

    const CharName = screen.getByText(/charmander/i);
    expect(CharName).toBeInTheDocument();

    userEvent.dblClick(button);
    userEvent.dblClick(button);
    userEvent.dblClick(button);
    userEvent.dblClick(button);

    expect(PikaName).toBeInTheDocument();

    const all = screen.getByRole('button', {
      name: /all/i });
    expect(all).toBeInTheDocument();
  });

  it('É mostrado apenas um Pokémon por vez.', () => {
    const allDetails = screen.getAllByRole('link', {
      name: /more details/i });
    expect(allDetails).toHaveLength(1);
  });

  it('Existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
    const totalTypes = 7;
    const allTypes = screen.getAllByTestId('pokemon-type-button');
    expect(allTypes).toHaveLength(totalTypes);
  });

  it('A partir da seleção de um tipo, exibir pokémons daquele tipo.', () => {
    const PikaName = screen.getByText(/pikachu/i);
    expect(PikaName).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /Electric/i });

    userEvent.click(button);

    expect(PikaName).toBeInTheDocument();
  });

  it('Garantir que o texto do botão é idêntico ao tipo do pokémon.', () => {
    const PikaName = screen.getByText(/pikachu/i);
    expect(PikaName).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /Electric/i });

    userEvent.click(button);

    const type = screen.getAllByText(/electric/i);
    expect(type).toHaveLength(2);
  });

  it('Contém um botão para resetar o filtro.', () => {
    const button = screen.getByRole('button', {
      name: /all/i });
    expect(button).toBeInTheDocument();
  });

  it('Mostrar Pokémons sem filtros quando o botão All for clicado.', () => {
    const allButton = screen.getByRole('button', {
      name: /all/i });
    userEvent.click(allButton);

    const PikaName = screen.getByText(/pikachu/i);
    expect(PikaName).toBeInTheDocument();

    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i });

    userEvent.click(nextButton);

    const CharName = screen.getByText(/charmander/i);
    expect(CharName).toBeInTheDocument();
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All.', () => {
    const PikaName = screen.getByText(/pikachu/i);
    expect(PikaName).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(button);

    const CharName = screen.getByText(/charmander/i);
    expect(CharName).toBeInTheDocument();

    userEvent.dblClick(button);
    userEvent.dblClick(button);
    userEvent.dblClick(button);
    userEvent.dblClick(button);

    expect(PikaName).toBeInTheDocument();
  });
});
