import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { OAuthSuccess } from "./pages/oAuthSuccess";
import ZakahCalculatorPage from "./pages/zakahCalculator";

import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import MosqueAdminsList from "./pages/MosqueAdminsList";
import AddMosqueAdmin from "./pages/AddMosqueAdmin";
import MosquesList from "./pages/MosquesList";
import AddMosque from "./pages/AddMosque";
import DonationDetails from "./pages/DonationDetails";
import Donate from "./pages/donate";
import SuperAdminRoute from "./components/SuperAdminRoute";
import AdminRoute from "./components/AdminRoute";

import AdminDashboard from "./pages/AdminDashboard";
import DistributorDashboard from "./pages/DistributorDashboard";
import DistributorRoute from "./components/DistributorRoute";

// ================= ROOT =================
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// ================= PUBLIC ROUTES =================
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

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

const oAuthSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/oauth-success",
  component: OAuthSuccess,
});

const distributorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/distributor",
  component: () => (
    <DistributorRoute>
      <Outlet />
    </DistributorRoute>
  ),
});

const distributorDashboardRoute = createRoute({
  getParentRoute: () => distributorRoute,
  path: "/",
  component: DistributorDashboard,
});


// ================= SUPER ADMIN ROUTES =================
const superAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/superadmin",
  component: () => (
    <SuperAdminRoute>
      <Outlet />
    </SuperAdminRoute>
  ),
});

const superAdminDashboardRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/",
  component: SuperAdminDashboard,
});

const superAdminMosquesRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/mosques",
  component: MosquesList,
});

const superAdminAddMosqueRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/add-mosque",
  component: AddMosque,
});

const superAdminAdminsRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/admins",
  component: MosqueAdminsList,
});

const superAdminAddAdminRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/add-admin",
  component: AddMosqueAdmin,
});

const donationDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donation-details",
  component: DonationDetails,
});

const donateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donate",
  component: Donate,
});

// ================= ADMIN ROUTES =================
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminRoute>
      <Outlet />
    </AdminRoute>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
  component: AdminDashboard,
});

// ================= ROUTE TREE =================
const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  registerRoute,
  zakahCalculatorRoute,
  donationDetailsRoute,
  donateRoute,
  oAuthSuccessRoute,
  distributorRoute.addChildren([distributorDashboardRoute]),

  superAdminRoute.addChildren([
    superAdminDashboardRoute,
    superAdminMosquesRoute,
    superAdminAddMosqueRoute,
    superAdminAdminsRoute,
    superAdminAddAdminRoute,
  ]),

  adminRoute.addChildren([
    adminDashboardRoute, //
  ]),
]);

// ================= ROUTER =================
export const router = createRouter({ routeTree });
