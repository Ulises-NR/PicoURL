import { persistReducer } from "redux-persist";
import storageEngine from "@/utils/storage-engine";
import { combineReducers } from "@reduxjs/toolkit";
import ttlReducers from "./slices/ttlSlice";
import urlReducers from "./slices/urlSlice";

const persistConfig = {
  key: "root",
  storage: storageEngine,
};

const rootReducer = combineReducers({
  ttl: ttlReducers,
  url: urlReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
