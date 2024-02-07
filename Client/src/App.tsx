import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import CustomVision from './Components/Vision/CustomVision'
function App() {

  return (
    <Routes>
<Route path='' element={<Home />} />
<Route path="/vision" element={<CustomVision />}/>
    </Routes>
  )
}

export default App
