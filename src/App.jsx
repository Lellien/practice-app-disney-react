import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "./Form";
import Result from "./Result";

function App() {
  const [characterInfo, setCharacterInfo] = useState({ loaded: false });

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

  function findMostSignificant(results) {
    //determines which result to use based on most films appeared in
    let movies = [];
    results.forEach((result) => {
      movies.push(result.films.length);
    });
    Math.max(...movies);
    return results.find(
      (result) => result.films.length === Math.max(...movies)
    );
  }

  function handleResponse(response) {
    let results = response.data.data;
    /* only want results with films and park attractions. check single result or filter if array*/
    if (!Array.isArray(results)) {
      //if only one result
      if (results.films.length && results.parkAttractions.length) {
        formatCharacter(results);
      } else return;
    } else {
      results = results.filter(
        (result) => result.films.length && result.parkAttractions.length
      );

      formatCharacter(findMostSignificant(results));
    }
  }

  function search(character) {
    let apiUrl = `https://api.disneyapi.dev/character?name=${character}`;
    axios.get(apiUrl).then(handleResponse);
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
