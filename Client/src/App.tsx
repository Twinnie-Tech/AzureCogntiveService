import {Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import CustomVision from './Components/Vision/CustomVision'
import TagForm from './Components/Vision/TagForm'
import Compare from './Components/Vision/Compare'
import ColorsForm from './Components/Vision/ColorsForm'
import AdultContent from './Components/Vision/AdultContent'
import Brand from './Components/Vision/Brand'
function App() {

  return (
    <Routes>
<Route path='' element={<Home />} />
<Route path="/vision" element={<CustomVision />}/>
<Route path="/vision/tags" element={<TagForm />} />
<Route path="/vision/brands" element={<Brand />} />
<Route path="/vision/compare" element={<Compare />} />
<Route path='/vision/colors' element={<ColorsForm />} />
<Route path='/vision/adult' element={<AdultContent />} />
    </Routes>
  )
}

export default App
