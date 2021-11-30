import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('01 - <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto de links de navegação.', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /home/i });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', {
      name: /about/i });
    expect(about).toBeInTheDocument();

    const favorite = screen.getByRole('link', {
      name: /favorite/i });
    expect(favorite).toBeInTheDocument();
  });

  it('É redirecionada para a página inicial, o clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/');

      const heading = screen.getByRole('heading', {
        name: /encountered pokémons/i });
      expect(heading).toBeInTheDocument();
    });

  it('É redirecionada à About clicando em About',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/about');

      const heading = screen.getByRole('heading', {
        name: /about/i });
      expect(heading).toBeInTheDocument();
    });

  it('É redirecionada à Favorite Pokémons clicando em Pokémons Favoritados',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/favorites');

      const heading = screen.getByRole('heading', {
        name: /Favorite pokémons/i });
      expect(heading).toBeInTheDocument();
    });
});
