import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import ZakahCalculatorPage from "./pages/zakahCalculator";

// Root route with an Outlet for children
const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});

// Home route
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// Login route
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// Register route
const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const zakahCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zakahcalculator",
  component: ZakahCalculatorPage,
});

// Add all children to root
const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  zakahCalculatorRoute,
]);

// Export router
export const router = createRouter({ routeTree });
