// testing
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { GameCard } from "./GameCard.js";

let game = {
  name: "test",
  id: "T0",
  genres: ["hola", "chau"],
  img: "https://imagen.nextn.es/wp-content/uploads/2020/11/2011-26-Pokemon-25-Aniversario-Pikachu.jpg?strip=all&lossy=1&ssl=1",
};



describe('when gameCard render', () => {
  it('displays game name', () => {
    const gc = render(
      <BrowserRouter>
        <GameCard game={game} />
      </BrowserRouter>
    );
    gc.getByText(game.name);
  })
  it('displays game genres', () => {
    const gc = render(
      <BrowserRouter>
        <GameCard game={game} />
      </BrowserRouter>
    );
    gc.getByText(`${game.genres[0]} / ${game.genres[1]}`);
  })
  it('displays game img', () => {
    render(  <BrowserRouter>
      <GameCard game={game} />
    </BrowserRouter>)
    const displayedImage = document.querySelector("img");
    expect(displayedImage.src).toContain(game.img);
  })
  it('displays game link', () => {
    render(  <BrowserRouter>
      <GameCard game={game} />
    </BrowserRouter>)
    const displayedImage = document.querySelector("a");
    expect(displayedImage.href).toContain(`home/detail/${game.id}`);
  })
});