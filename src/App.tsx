import React from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route>
        <Route path="/">
          <Route index element={<Layout/>}/>
            <Route path="login" element={<AuthPage/>}/>
        </Route>
      </Route>
  ))

    return (
        <RouterProvider router={router}/>
    );
}

export default App;
