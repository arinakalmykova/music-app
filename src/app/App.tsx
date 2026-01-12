import '@/app/styles/App.css'
import { RouterProvider } from 'react-router-dom';
import {router} from '@/app';
import { AudioPlayer } from '@/widgets';
import {Fragment} from 'react';

function App() {
  return (
    <Fragment>
      <RouterProvider router={router}></RouterProvider>
      <AudioPlayer/>
    </Fragment>
  )
}

export default App
