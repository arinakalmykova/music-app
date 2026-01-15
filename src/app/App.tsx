import '@/app/styles/App.css'
import { RouterProvider } from 'react-router-dom';
import {router} from '@/app';
import { AudioPlayer } from '@/widgets';
import { PlayerProvider} from '@/features';
import {MiniPlayer} from '@/widgets'
                
function App() {
  return (
    <PlayerProvider>
      <RouterProvider router={router}></RouterProvider>
      <AudioPlayer/>
      <MiniPlayer />
    </PlayerProvider>
  )
}

export default App
