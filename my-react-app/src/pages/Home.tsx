import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useGetCharactersQuery } from "../services/RickMortyFetch";
import { useEffect } from "react";
import {
  deleteCharacter,
  getCharacters,
} from "../redux/slices/GetCharactersSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCharactersQuery(20);
  console.log(data?.results);
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );

  useEffect(() => {
    if (data?.results && characters.length === 0) {
      dispatch(getCharacters(data.results));
    }
  }, [data, characters, dispatch]);

  const handelDeleteCharacter = (id: number) => {
    dispatch(deleteCharacter(id));
  };

  const handleEditCharacter = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleAddCharacter = () => {
    navigate("/add");
  };

  return (
    <section>
      <h1>Rick and Morty Characters</h1>
      <button onClick={handleAddCharacter}>Add Character</button>

      {isLoading && characters.length === 0 ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching characters</p>
      ) : characters.length > 0 ? (
        <section>
          {characters.map((character) => (
            <div key={character.id}>
              <h2>{character.status}</h2>
              <p>{character.species}</p>
              <button onClick={() => handleEditCharacter(character.id)}>
                Edit
              </button>
              <button onClick={() => handelDeleteCharacter(character.id)}>
                Delete
              </button>
            </div>
          ))}
        </section>
      ) : (
        <p>No characters available</p>
      )}
    </section>
  );
};
export default Home;
