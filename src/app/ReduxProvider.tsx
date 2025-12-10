"use client";
import { Provider } from "react-redux";
import { persister, store } from "@/services/store";
import { ReactPageProps } from "@/ts/react";
import { PersistGate } from "redux-persist/integration/react";

type Props = Readonly<ReactPageProps>;

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>{children}</PersistGate>
    </Provider>
  );
}
