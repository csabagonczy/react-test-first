import { ChangeEvent, useEffect, useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";

import { MovieModel } from "../../models";

interface EditMovieModalProps {
  movie: MovieModel;
  show: boolean;
  onHide: () => void;
  onSave: (movie: MovieModel) => void;
}

const EditMovieModal = ({
  movie,
  show,
  onHide,
  onSave,
}: EditMovieModalProps) => {
  const [title, setTitle] = useState(movie.title);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  useEffect(() => {
    const isFormValid = title.trim() !== "";
    setIsSaveDisabled(!isFormValid);
  }, [title]);

  const handleSave = () => {
    if (!isSaveDisabled) {
      onSave({ ...movie, title });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Movie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal.Body>
      <ModalFooter>
        <button
          className="btn btn-primary w-100"
          onClick={handleSave}
          disabled={isSaveDisabled}
        >
          Save
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default EditMovieModal;
