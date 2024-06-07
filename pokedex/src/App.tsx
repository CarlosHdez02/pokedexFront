import { Routes, Route } from "react-router-dom";

import PokemonsPage from "./pages/pokemons/Pokemons";
import TrainersPage from "./pages/trainers/Trainers";

import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Home/>}/>
          <Route path="/pokemon" element={<PokemonsPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
