"use client";
import { Provider } from "react-redux";
import { persister, store } from "@/services/store";
import { ReactPageProps } from "@/ts/react";
import { PersistGate } from "redux-persist/integration/react";
import { ErrorBoundary } from "@errors-tracer/react";

type Props = Readonly<ReactPageProps>;

export default function ReduxProvider({ children }: Props) {
  const cred = {
    orgKey: process.env.NEXT_PUBLIC_ERRORS_TRACER_ORG_KEY as string,
    appKey: process.env.NEXT_PUBLIC_ERRORS_TRACER_PRODUCTION_APP_KEY as string,
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <ErrorBoundary
          remoteUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/v0.1/registry/react`}
          fallback={<div>oops, something wrong.</div>}
          credentials={cred}
        >
          {children}
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}
