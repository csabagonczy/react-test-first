import { useState } from "react";
import { TrashFill, PencilFill, SortDown, SortUp } from "react-bootstrap-icons";

import { Button } from "components";
import { MovieModel } from "models";
import EditMovieModal from "./EditMovieModal";

import "./Movies.css";

interface MoviesProps {
  list: MovieModel[];
}

enum SortBy {
  TITLE = "title",
  RATING = "rating",
  YEAR = "year",
}

enum OrderBy {
  ASC = "asc",
  DESC = "desc",
}

const Movies = ({ list }: MoviesProps) => {
  const [movies, setMovies] = useState<MovieModel[]>(list);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>(null);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.RATING);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.DESC);

  const onClickDelete = (id: number) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
  };

  const onClickEdit = (id: number) => {
    const movie = movies.find((movie) => movie.id === id);
    if (movie) {
      setSelectedMovie(movie);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const handleMovieSave = (updatedMovie: MovieModel) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
    handleModalClose();
  };

  const toggleSortDirection = () => {
    setOrderBy(orderBy === OrderBy.ASC ? OrderBy.DESC : OrderBy.ASC);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortBy);
  };

  const getSortedMovies = () =>
    [...movies].sort((a, b) => {
      if (sortBy === SortBy.RATING) {
        return orderBy === OrderBy.ASC
          ? a.rating - b.rating
          : b.rating - a.rating;
      }

      if (sortBy === SortBy.YEAR) {
        return orderBy === OrderBy.ASC ? a.year - b.year : b.year - a.year;
      }

      return orderBy === OrderBy.ASC
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

  return (
    <div className="movie-container">
      <div className="sorter-title">Sort by</div>
      <div className="sorter">
        <select
          id="sortSelector"
          className="selector"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value={SortBy.RATING}>Rating</option>
          <option value={SortBy.TITLE}>Alphabetical</option>
          <option value={SortBy.YEAR}>Year</option>
        </select>
        <Button
          className="btn btn-primary"
          onClick={() => toggleSortDirection()}
        >
          {orderBy === OrderBy.ASC ? <SortUp /> : <SortDown />}
        </Button>
      </div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
        {getSortedMovies().map((movie) => (
          <div key={movie.id} className="col">
            <div
              className={`card h-100 ${
                selectedMovie && selectedMovie.id === movie.id
                  ? "highlight"
                  : ""
              }`}
            >
              <img
                src={movie.thumbnail}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">Year: {movie.year}</p>
                <p className="card-text">Rating: {movie.rating}</p>
              </div>
              <div className="card-footer button-box">
                <Button
                  className="btn btn-secondary w-100"
                  onClick={() => onClickEdit(movie.id)}
                >
                  <PencilFill />
                </Button>
                <Button
                  className="btn btn-danger w-100"
                  onClick={() => onClickDelete(movie.id)}
                >
                  <TrashFill />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {selectedMovie && (
          <EditMovieModal
            movie={selectedMovie}
            show={showModal}
            onHide={handleModalClose}
            onSave={handleMovieSave}
          />
        )}
      </div>
    </div>
  );
};

export default Movies;
