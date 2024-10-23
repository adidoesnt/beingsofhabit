import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  NotFoundRoute,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./context/auth";
import { useEffect } from "react";
import { apiClient } from "./utils";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultNotFoundComponent: () => "404 Not Found",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const auth = useAuth();
  const { setUser } = auth;

  useEffect(() => {
    try {
      apiClient.get("/users/me").then(({ data }) => {
        if (!data) throw new Error("No user returned");
        setUser(data);
      });
    } catch (error) {
      console.warn("Failed to set user on initial load", error);
    }
  }, []);

  return <RouterProvider router={router} context={{ auth }} />;
};

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
