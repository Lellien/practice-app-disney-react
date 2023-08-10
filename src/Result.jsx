import { useState } from "react";

export default function Result(character) {
  console.log(character.character.name);
  //   function listParkAttractions(attractionList) {
  //     let place = "";
  //     attractionList.forEach((item) => {
  //       place = place + `<li>${item}</li>`;
  //     });
  //     return place;
  //   }

  //   function listMovies(movieList) {
  //     let movies = "";
  //     movieList.forEach((item, index) => {
  //       if (index > 0) {
  //         movies = movies + `<li>` + item + `</li>`;
  //       }
  //     });
  //     return movies;
  //   }

  function showCharacter(character) {
    let display = `
    `;
  }
  return (
    <>
      <div className="container ">
        <div class="row">
          <h2 className="fancy-font">{character.name}</h2>
          <div className="d-block d-md-none col-md-6">
            <img
              className="rounded"
              src={character.image}
              alt={`Image of ${character.name}`}
            ></img>
          </div>
          <div className="col-md-6">
            <p>
              <strong>{character.name}</strong> is
              {character.leadRole
                ? `the main protagonist in the movie <em>"${character.mainTitle}"</em>, accordingly named,`
                : `a character from the movie <em>${character.mainTitle}</em>`}
              and also appears in
            </p>
            <ul>
              {/* {character.movies.map((movie, index) => {
                if (index > 0) {
                  return <li>{movie}</li>;
                }
              })} */}
            </ul>
            <p>
              {character.name} can be found in real life at Disney park
              attractions including{" "}
              {/* <ul> {listParkAttractions(character.parkAttractions)}</ul> */}
            </p>
            <p>
              {" "}
              To read more about {character.name}, head over{" "}
              <a href={character.info} target="_blank">
                {" "}
                here{" "}
              </a>
              , a page with tons of information{" "}
            </p>
          </div>
          <div class="d-none d-md-block col-md-6">
            <img
              class="rounded"
              src="${character.image}"
              alt="Image of ${
      character.name
    }"
            ></img>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
