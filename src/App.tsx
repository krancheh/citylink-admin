import React from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route>
          <Route path="/" element={<Layout/>}>
              <Route path="route-records" element={"text"}/>
              <Route path="routes" element={"text"}/>
              <Route path="cities" element={"text"}/>
              <Route path="tickets" element={"text"}/>
          </Route>

          <Route path="login" element={<AuthPage/>}/>
      </Route>
  ))

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
