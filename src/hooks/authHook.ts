import { useTypedSelector } from "@/services/store";
import { useEffect } from "react";

type middleware = "authenticated" | "unauthenticated";

export const AuthHook = (middleware: middleware) => {
  const { authenticated } = useTypedSelector((state) => state.auth);

  useEffect(() => {
    const shouldBeLoggedIn = () => {
      if (!authenticated) {
        window.location.replace("/auth/login");
      }
    };

    const shouldNotBeLoggedIn = () => {
      if (authenticated) {
        window.location.replace("/");
      }
    };

    middleware === "authenticated" ? shouldBeLoggedIn() : shouldNotBeLoggedIn();
  }, [authenticated]);

  return [authenticated];
};
