import './App.css'
import { LocationStorage } from './context/LocationContext';
import { Page } from './components/page/Page';


/**
 * TODO: 
 * 1- create custom Hook to fetch the data on load page using some default ip
 * 2- Marker automatically change on search
 * 3- skeleton screen to load the content  
 */


function App() {
  return (
    <LocationStorage>
      <Page />
    </LocationStorage>  
  )
}

export default App
