"use client";
import { Provider } from "react-redux";
import { persister, store } from "@/services/store";
import { ReactPageProps } from "@/ts/react";
import { PersistGate } from "redux-persist/integration/react";
import { ErrorBoundary } from "@errors-tracer/react";

type Props = Readonly<ReactPageProps>;

export default function ReduxProvider({ children }: Props) {
  const cred = {
    orgKey: "d56b878cd6b10c909bfec0441f",
    appKey: "3ad7fd2a8cc8a7825b0ed3c3f3",
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
