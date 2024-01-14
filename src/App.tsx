import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { LocationStorage } from './context/LocationContext';
import { Page } from './components/page/Page';


function App() {
  return (
    <LocationStorage>
      <Page />
    </LocationStorage>  
  )
}

export default App
