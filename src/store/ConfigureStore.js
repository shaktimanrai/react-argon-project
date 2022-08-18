import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { rootReducer } from "./reducer/combineReducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import api from "./middleware/api";

const persistConfig = {
  key: "Compsec",
  storage,
  debut: true,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStorage = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
      logger,
      api,
    ],
    devTools: process.env.NODE_ENV !== "production",
  });

  let persistor = persistStore(store);
  return { store, persistor };
};
