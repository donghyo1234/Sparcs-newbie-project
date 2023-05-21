import { ThemeProvider } from "styled-components"
import { RouterProvider } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

import { theme } from "./theme"
import { router } from "./Router"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
