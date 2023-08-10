import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "./Form";
import Result from "./Result";

function App() {
  const [characterInfo, setCharacterInfo] = useState({ loaded: false });
  console.log(characterInfo);

  function isMainCharacter(name, movie) {
    let splitName = name.split(" ");
    return splitName.some((item) => movie.includes(item));
  }

  function formatMainTitle(movieTitle) {
    let refinedMovieTitle = movieTitle
      .split(" ")
      .filter((segment) => !segment.includes("(") && !segment.includes(")"));
    let newTitle = "";
    refinedMovieTitle.forEach((word, index) => {
      if (index < refinedMovieTitle.length - 1) {
        newTitle = newTitle + word + " ";
      } else {
        newTitle = newTitle + word;
      }
    });
    return newTitle;
  }

  function formatCharacter(characterData) {
    let character = {
      loaded: true,
      name: characterData.name,
      movies: characterData.films,
      mainTitle: formatMainTitle(characterData.films[0]),
      parkAttractions: characterData.parkAttractions,
      image: characterData.imageUrl,
      info: characterData.sourceUrl,
    };

    character.leadRole = isMainCharacter(character.name, character.mainTitle);
    setCharacterInfo(character);
  }

  function respond(response) {
    let result = response.data.data;
    if (!Array.isArray(result)) {
      //if only one result
      formatCharacter(result);
    } else {
      result.forEach((item) => {
        if (item.films.length && item.parkAttractions.length) {
          formatCharacter(item);
        }
      });
    }
  }

  function search(character) {
    let apiUrl = `https://api.disneyapi.dev/character?name=${character}`;
    axios.get(apiUrl).then(respond);
  }

  return (
    <>
      <header className="ps-5 pe-5 pt-3 pb-3">
        <h1 className="text-center fancy-font">Disney Characters</h1>
        <Form searchChar={search} />
      </header>
      {characterInfo.loaded ? <Result character={characterInfo} /> : null}
    </>
  );
}

export default App;
