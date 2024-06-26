import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/containers/Layout";
import AuthPage from "./pages/AuthPage";
import RequireAuth from "./components/common/RequireAuth";
import RouteRecordsPage from "./pages/RouteRecordsPage";
import RoutesPage from './pages/RoutesPage';
import CitiesPage from './pages/CitiesPage';
import ErrorPage from './pages/ErrorPage';
import UsersPage from './pages/UsersPage';
import TicketsPage from './pages/TicketsPage';
import HomePage from './pages/HomePage';
import StaffPage from "./pages/StaffPage";
import BusesPage from "./pages/BusesPage";

function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>
            {/* private routes */}
            <Route element={<RequireAuth />}>
                <Route element={<Layout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path="route-records" element={<RouteRecordsPage />} />
                    <Route path="routes" element={<RoutesPage />} />
                    <Route path="cities" element={<CitiesPage />} />
                    <Route path="tickets" element={<TicketsPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="staff" element={<StaffPage />} />
                    <Route path="buses" element={<BusesPage />} />
                </Route>
            </Route>

            {/* public routes */}
            <Route path="login" element={<AuthPage />} />
        </Route>
    ))

    return (
        <RouterProvider router={router} />
    );
}

export default App;
