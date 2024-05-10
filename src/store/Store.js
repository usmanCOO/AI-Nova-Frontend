import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../store/RootReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const AuthpersistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(AuthpersistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedAuthReducer,
});

export const persistor = persistStore(Store);
export default Store;
