import {
  combineReducers,
  configureStore,
  ConfigureStoreOptions,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import reactJsErrors from "./reactjs/reactjsSlice";
import auth from "./auth/authSlice";
import organizations from "./organizations/orgsSlice";
import applications from "./applications/appsSlice";
import system from ".//system/systemSlice";
import { authInterceptor } from "./authInterceptor";
import { api } from "./generic-api";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

type Option = ConfigureStoreOptions["preloadedState"] | undefined;

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  reactJsErrors,
  auth,
  organizations,
  applications,
  system,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = (options?: Option) =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(api.middleware)
        .concat(authInterceptor),
    ...options,
  });

export const store = createStore();
export const persister = persistStore(store); // ✅ persist store instance

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
