import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Characters {
  id: number;
  name: string;
  status: string;
  species: string;
}

interface CharactersState {
  characters: Characters[];
}

const initialState: CharactersState = {
  characters: [],
};

export const GetCharactersSlice = createSlice({
  name: "getCharacters",
  initialState,
  reducers: {
    getCharacters: (state, action: PayloadAction<Characters[]>) => {
      state.characters = action.payload;
    },
    addCharacter: (state, action: PayloadAction<Characters>) => {
      state.characters = [...state.characters, action.payload];
    },
    deleteCharacter: (state, action: PayloadAction<number>) => {
      state.characters = state.characters.filter(
        (character) => character.id !== action.payload
      );
    },
    editCharacter: (state, action: PayloadAction<Characters>) => {
      const index = state.characters.findIndex(
        (character) => character.id === action.payload.id
      );
      if (index !== -1) {
        state.characters[index] = action.payload;
      }
    },
  },
});

export const { getCharacters, addCharacter, deleteCharacter, editCharacter } = GetCharactersSlice.actions;
export default GetCharactersSlice.reducer;