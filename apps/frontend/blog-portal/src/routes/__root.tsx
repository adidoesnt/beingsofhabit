import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const { VITE_NODE_ENV: NODE_ENV = "PROD" } = import.meta.env;
const isDevEnv = NODE_ENV === "DEV";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {isDevEnv && <TanStackRouterDevtools position="bottom-right" />}
    </QueryClientProvider>
  );
}
