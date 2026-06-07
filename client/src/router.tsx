import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { OAuthSuccess } from "./pages/OAuthSuccess";
import ZakahCalculatorPage from "./pages/zakahCalculator";
import NisabPage from "./pages/NisabPage";
import QuranHadithPage from "./pages/QuranHadithPage";

import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import MesjidAdminsList from "./pages/MesjidAdminsList";
import AddMesjidAdmin from "./pages/AddMesjidAdmin";
import MesjidsList from "./pages/MesjidsList";
import AddMesjid from "./pages/AddMesjid";
import DonationDetails from "./pages/DonationDetails";
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

const nisabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nisab",
  component: NisabPage,
});

const quranHadithRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quran-hadith",
  component: QuranHadithPage,
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

const superAdminMesjidsRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/mesjids",
  component: MesjidsList,
});

const superAdminAddMesjidRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/add-mesjid",
  component: AddMesjid,
});

const superAdminAdminsRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/admins",
  component: MesjidAdminsList,
});

const superAdminAddAdminRoute = createRoute({
  getParentRoute: () => superAdminRoute,
  path: "/add-admin",
  component: AddMesjidAdmin,
});

const donationDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/donation-details",
  component: DonationDetails,
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
  nisabRoute,
  quranHadithRoute,
  donationDetailsRoute,
  oAuthSuccessRoute,
  distributorRoute.addChildren([distributorDashboardRoute]),

  superAdminRoute.addChildren([
    superAdminDashboardRoute,
    superAdminMesjidsRoute,
    superAdminAddMesjidRoute,
    superAdminAdminsRoute,
    superAdminAddAdminRoute,
  ]),

  adminRoute.addChildren([
    adminDashboardRoute,
  ]),
]);

// ================= ROUTER =================
export const router = createRouter({ routeTree });
