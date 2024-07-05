import { Navigate, Route, Routes } from "react-router-dom";

import Sandbox from "pages/SandboxPage/Sandbox";
import Movies from "pages/MoviesPage/Movies";
import { MovieModel } from "models";
import { Layout } from "components";
import MOVIES from "data/movies.ts";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route
          path="/movies"
          element={<Movies list={MOVIES as MovieModel[]}></Movies>}
        />
      </Routes>
    </Layout>
  );
};

export default App;
