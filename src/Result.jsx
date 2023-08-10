import "./Result.css";

export default function Result({ character }) {
  return (
    <>
      <div className="container ">
        <div className="row">
          <h2 className="fancy-font">{character.name}</h2>
          <div className="d-block d-md-none col-md-6">
            <img
              className="rounded"
              src={character.image}
              alt={`Image of ${character.name}`}
            />
          </div>
          <div className="col-md-6">
            <p>
              <strong>{character.name} </strong>is{" "}
              {character.leadRole ? (
                <span>
                  the main protagonist in the movie{" "}
                  <em>"{character.mainTitle}"</em>, accordingly named,
                </span>
              ) : (
                <span>
                  a character from the movie <em>{character.mainTitle}</em>
                </span>
              )}{" "}
              and also appears in
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
              <a href={character.info} target="_blank">
                {" "}
                this page
              </a>
              , which has tons more information{" "}
            </p>
          </div>
          <div className="d-none d-md-block col-md-6">
            <img
              className="rounded"
              src={character.image}
              alt={`Image of ${character.name}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
