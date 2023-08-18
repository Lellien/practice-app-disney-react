import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Form from "./Form";
import Result from "./Result";
import Footer from "./Footer";

function App() {
  const [characterInfo, setCharacterInfo] = useState({ loaded: false });

  function formatMainTitle(movieTitle) {
    //some responses have titles with unwanted extra information in the string eg. 'Alice in Wonderland (1951 film)' which should just be 'Alice in Wonderland'
    let refinedMovieTitle = movieTitle
      .split(" ")
      .filter((segment) => !segment.includes("(") && !segment.includes(")")); //filter out extra info in brackets
    let newTitle = ""; //reconstruct string
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
    let results = response;
    /* only want results with films and park attractions. check single result or filter if array*/
    if (!Array.isArray(results)) {
      //if only one result, check directly
      if (results.films.length && results.parkAttractions.length) {
        formatCharacter(results);
      }
      return;
    } else {
      //if multiple results (array) filter
      results = results.filter(
        (result) => result.films.length && result.parkAttractions.length
      );
      if (results.length) {
        formatCharacter(findMostSignificant(results));
      }
    }
  }

  function search(character) {
    let apiUrl = `https://api.disneyapi.dev/character?name=${character}`;
    axios.get(apiUrl).then(checkResponse);
    function checkResponse(response) {
      if (response && response.data.data.length !== 0) {
        /* Some responses .data.data are an empty array (eg. search for 'hello'). Returns true if .length > 0 (multiple results) or .length ===undefined (single result, no array) */
        handleResponse(response.data.data);
      }
    }
  }

  return (
    <>
      <header className="ps-5 pe-5 pt-3 pb-3">
        <h1 className="text-center fancy-font">Disney Characters</h1>
        <Form searchChar={search} />
      </header>
      {characterInfo.loaded ? (
        <>
          {" "}
          <Result character={characterInfo} />
          <Footer />
        </>
      ) : null}
    </>
  );
}

export default App;
