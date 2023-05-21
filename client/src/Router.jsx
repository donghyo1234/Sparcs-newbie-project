import React from "react"
import { createBrowserRouter, RouterProvider, Router, Link } from "react-router-dom"
import IndexPage from "./pages"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage/>,
  },

])