import '@/app/styles/App.css'
import { RouterProvider } from 'react-router-dom';
import {router} from '@/app/router/router.tsx';

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
