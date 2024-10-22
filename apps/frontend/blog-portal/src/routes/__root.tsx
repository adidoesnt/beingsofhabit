import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const { VITE_NODE_ENV: NODE_ENV = "PROD" } = import.meta.env;
const isDevEnv = NODE_ENV === "DEV";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      {isDevEnv &&<TanStackRouterDevtools position="bottom-right" />}
    </>
  )
}
