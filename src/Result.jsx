import { useRef } from "react";
import "./Result.css";

export default function Result({ character }) {
  const charName = useRef(null);

  function animateName() {
    charName.current.classList.toggle("animate");
  }

  return (
    <>
      <div className="container ">
        <div className="row">
          <h2 className="fancy-font" ref={charName}>
            {character.name}
          </h2>
          <div className="d-block d-md-none col-md-6">
            <img
              className="rounded"
              src={character.image}
              alt={`Image of ${character.name}`}
            />
          </div>
          <div className="col-md-6">
            <p>
              <strong>{character.name} </strong>is a character from the movie{" "}
              <em>{character.mainTitle}</em> and also appears in
            </p>
            <ul>
              {character.movies.map((movie, index) => {
                if (index > 0) {
                  return <li key={index}>{movie}</li>;
                }
              })}
            </ul>
            <p>
              {character.name} can be found in real life at Disney park
              attractions including{" "}
            </p>
            <ul>
              {character.parkAttractions.map((movie, index) => {
                if (index > 0) {
                  return <li key={index}>{movie}</li>;
                }
              })}
            </ul>

            <p>
              {" "}
              To read more about {character.name}, head over to{" "}
              <a
                href={`${character.info}#mw-content-text`}
                target="_blank"
                title={`${character.name} wiki page on disney.fandom.com`}
              >
                {" "}
                this page
              </a>
              , which has much more information{" "}
            </p>
          </div>
          <div className="d-none d-md-block col-md-6">
            <img
              className="rounded"
              src={character.image}
              alt={`Image of ${character.name}`}
              onMouseEnter={(e) => {
                e.preventDefault();
                animateName();
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                animateName();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
