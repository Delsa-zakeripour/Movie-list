import { useEffect, useState, useRef } from "react";
import MovieDetails from "./MovieDetails";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocakStorage";
import { useKey } from "./useKey";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception2",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");

  // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(function () {
  //   const storedData = localStorage.getItem("watched");
  //   return JSON.parse(storedData);
  // });

  const { isLoading, error, movies } = useMovies(query, handleCloseMovies);
  const [watched, setWatched] = useLocalStorage([], "movie");
  console.log("Watch", watched);

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleAddWatched(movie) {
    console.log("movie =====> ", movie);
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movies]));
  }

  function handleCloseMovies() {
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );

  // useEffect(
  //   function () {
  //     const controller = new AbortController();

  //     async function fetchMovies() {
  //       try {
  //         setIsLoading(true);
  //         setError("");

  //         const res = await fetch(
  //           `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
  //           { signal: controller.signal }
  //         );

  //         if (!res.ok)
  //           throw new Error("Something went wrong with fetching movies");

  //         const data = await res.json();
  //         if (data.Response === "False") throw new Error("Movie not found");

  //         setMovies(data.Search);
  //         setError("");
  //       } catch (err) {
  //         if (err.name !== "AbortError") {
  //           console.log(err.message);
  //           setError(err.message);
  //         }
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }

  //     if (query.length < 3) {
  //       setMovies([]);
  //       setError("");
  //       return;
  //     }

  //     handleCloseMovies();
  //     fetchMovies();

  //     return function () {
  //       controller.abort();
  //     };
  //   },
  //   [query]
  // );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResualt movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovies}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchSummry watched={watched} />
              <WatchMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        {/* <Search />
        <NumResualt movies={movies} /> */}
        {children}
      </nav>
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>Movie list</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  // with costum hook
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  // useEffect(function () {
  //   function callBack(e) {
  //     if (document.activeElement === inputEl.current) return;

  //     if (e.code === "Enter") {
  //       inputEl.current.focus();
  //       setQuery("");
  //     }
  //   }
  //   document.addEventListener("keydown", callBack);
  //   return () => document.addEventListener("keydown", callBack);
  // }, []);

  // when for first time go to site the search filed is focus (but with old way /js)
  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   console.log("el", el);
  //   el.focus();
  // }, []);

  // when for first time go to site the search filed is focus (but with better way)
  // useEffect(function () {
  //   inputEl.current.focus();
  // }, []);

  // at the first the input dosn't focus when click enter key search input be focus
  // useEffect(
  //   function () {
  //     function callBack(e) {
  //       if (document.activeElement === inputEl.current) return;
  //       if (e.code === "Enter") inputEl.current.focus();
  //       setQuery("");
  //     }

  //     document.addEventListener("keydown", callBack);
  //     return () => document.addEventListener("keydown", callBack);
  //   },
  //   [setQuery]
  // );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResualt({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length} </strong> results
    </p>
  );
}

function Main({ children }) {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}

function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function Box({ children }) {
  // const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {/* {isOpen && (
        <>
          <WatchSummry watched={watched} />
          <WatchMovieList watched={watched} />
        </>
      )} */}
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

<MovieDetails />;

function WatchSummry({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchMovieList({ watched, onDeleteWatched }) {
  console.log(" WatchedMovie", watched);
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}

function Loading() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message} </p>;
}
