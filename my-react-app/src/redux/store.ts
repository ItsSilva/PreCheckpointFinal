import { configureStore } from "@reduxjs/toolkit";
import { rickMortyFetch } from "../services/RickMortyFetch";
import GetCharactersSlice from "./slices/GetCharactersSlice";

export const store = configureStore ({
    reducer: {
        [rickMortyFetch.reducerPath]: rickMortyFetch.reducer,
        characters: GetCharactersSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(rickMortyFetch.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;