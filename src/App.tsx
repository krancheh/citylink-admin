import React from 'react';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import RequireAuth from "./components/RequireAuth";
import RouteRecordsPage from "./pages/RouteRecordsPage";
import RoutesPage from './pages/RoutesPage';
import CitiesPage from './pages/CitiesPage';

function App() {

    const router = createBrowserRouter(createRoutesFromElements(
        <Route>
            {/* private routes */}
            <Route element={<RequireAuth />}>
                <Route path="/" element={<Layout />}>
                    <Route path="route-records" element={<RouteRecordsPage />} />
                    <Route path="routes" element={<RoutesPage />} />
                    <Route path="cities" element={<CitiesPage />} />
                    <Route path="tickets" element={"text"} />
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
