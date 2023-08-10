import { useState } from "react";
import "./Form.css";

export default function Form({ searchChar }) {
  const [searchWord, setSearchWord] = useState(null);

  function updateSearchWord(event) {
    event.preventDefault();
    setSearchWord(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (searchWord) searchChar(searchWord);
  }

  return (
    <>
      <form
        className="form-style"
        id="char-search-input"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search for a Disney Character"
          autoComplete="off"
          onChange={updateSearchWord}
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </>
  );
}
