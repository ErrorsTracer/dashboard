export const authInterceptor = (state: any) => (next: any) => (action: any) => {
  if (action.payload?.status === 401) {
    // handle error from api in a single place (HERE)
    localStorage.setItem("authenticated", "false");
    localStorage.setItem("accessToken", "");

    // window.location.replace("/login");
  }

  return next(action);
};
