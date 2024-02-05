import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import RequireAuth from "./components/RequireAuth";
import RouteRecordsPage from "./pages/RouteRecordsPage";
import RoutesPage from './pages/RoutesPage';
import CitiesPage from './pages/CitiesPage';
import ErrorPage from './pages/ErrorPage';
import UsersPage from './pages/UsersPage';
import TicketsPage from './pages/TicketsPage';

function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route errorElement={<ErrorPage />}>
            {/* private routes */}
            <Route element={<RequireAuth />}>
                <Route path="/" element={<Layout />}>
                    <Route path="route-records" element={<RouteRecordsPage />} />
                    <Route path="routes" element={<RoutesPage />} />
                    <Route path="cities" element={<CitiesPage />} />
                    <Route path="tickets" element={<TicketsPage />} />
                    <Route path="users" element={<UsersPage />} />
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
