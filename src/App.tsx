import { Routes, Route } from "react-router-dom";
import TrainersPage from "./pages/trainers/Trainers";

import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Home from "./pages/Home/Home";
import PokemonInfo from "./components/PokemonInfo/PokemonInfo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Home/>}/>
          <Route path="/pokemon/:id" element={<PokemonInfo/>}/>
          <Route path="/trainers" element={<TrainersPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
