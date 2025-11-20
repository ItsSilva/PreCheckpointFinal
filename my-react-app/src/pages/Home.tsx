import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useGetCharactersQuery } from "../services/rickMortyFetch";
import { useEffect, useState } from "react";
import {
  deleteCharacter,
  getCharacters,
} from "../redux/slices/GetCharactersSlice";
import { toggleUserType } from "../redux/slices/UserSlice";
import type { Characters } from "../redux/slices/GetCharactersSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCharactersQuery(20);
  console.log(data?.results);
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );
  const userType = useSelector((state: RootState) => state.user.userType);
  const [searchTerm, setSearchTerm] = useState("");

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
    if (userType === "admin") navigate("/add");
  };

  const handleToggleUser = () => {
    dispatch(toggleUserType());
  };

  const handleSearchCharacterByName = (name: string) => {
    setSearchTerm(name);
  };

  const filteredCharacters = characters.filter((character: Characters) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <div>
        <label>Search characters by name:</label>
        <input
          type="text"
          onChange={(name) => handleSearchCharacterByName(name.target.value)}
        />
      </div>

      <div>
        <h1>Rick and Morty Characters</h1>
        <button onClick={handleToggleUser}>
          Current: {userType} (click to toggle)
        </button>
        {userType === "admin" && (
          <button onClick={handleAddCharacter}>Add Character</button>
        )}
      </div>

      {isLoading && characters.length === 0 ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error fetching characters</p>
      ) : filteredCharacters.length > 0 ? (
        <section>
          {filteredCharacters.map((character) => (
            <div key={character.id}>
              <h1>{character.name}</h1>
              <h2>{character.status}</h2>
              <p>{character.species}</p>
              {userType === "admin" && (
                <>
                  <button onClick={() => handleEditCharacter(character.id)}>
                    Edit
                  </button>
                  <button onClick={() => handelDeleteCharacter(character.id)}>
                    Delete
                  </button>
                </>
              )}
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
