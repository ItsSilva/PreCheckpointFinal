import { configureStore } from "@reduxjs/toolkit";
import { rickMortyFetch } from "../services/rickMortyFetch";
import GetCharactersSlice from "./slices/GetCharactersSlice";
import UserSlice from "./slices/UserSlice";

export const store = configureStore ({
    reducer: {
        [rickMortyFetch.reducerPath]: rickMortyFetch.reducer,
        characters: GetCharactersSlice,
        user: UserSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(rickMortyFetch.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;