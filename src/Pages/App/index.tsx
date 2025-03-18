import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '../../AppRoutes'
import Sidebar from '../../Components/Sidebar'
import '../../sass/globals.scss'

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
