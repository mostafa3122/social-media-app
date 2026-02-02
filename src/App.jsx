import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import routes from './Routes/Routes'
import UserContextProvider from './components/context/UserContext/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <RouterProvider router={routes} />
        <Toaster position="top-center" />
      </UserContextProvider>
    </QueryClientProvider>

  )
}

export default App
