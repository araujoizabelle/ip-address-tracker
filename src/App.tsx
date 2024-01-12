import { useState } from 'react'
import './App.css'
import { Map } from './components/map/Map';
import { CardInformations } from './components/cardInformations/CardInformations';

interface location {
  city: string, 
  country: string,
  geonameId: number,
  lat: number,
  lng:number,
  postalCode:string,
  region:string,
  timezone:string,
  isp: string,
  ip: string,
}

/**
 * TODO: 
 * 1- create custom Hook to fetch the data on load page using some default ip
 * 2- Marker automatically change on search
 * 3- skeleton screen to load the content  
 */

const apiKey = process.env.apikey;

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [locationData, setLocationData] = useState<location>();

  const handleSearch = async () => {
    try {
      const searchData = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${searchValue}`)
      const {location, isp, ip } = await searchData.json();
      setLocationData({...location, isp, ip});
    } catch (error) {
      console.error('erro na request', error)
    }
  }

  return (
    <div className='container'>
      
      <div className='container-search'>
        <h1 className='title'>IP Address Tracker</h1>
        <input type='text' placeholder='Search for any IP address or domain' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
        <button onClick={handleSearch}> <img src='src/assets/images/icon-arrow.svg'/> </button>
      </div>

      {locationData && 
        <CardInformations 
          ip={locationData.ip} 
          postalCode={locationData.postalCode}
          city={locationData.city} 
          timezone={locationData.timezone}
          region={locationData.region}
          country={locationData.country}
          isp={locationData.isp}
        />
      }

      {locationData && 
        <div className='container-map'>
          <Map lat={locationData.lat} lng={locationData.lng}/>
        </div>
      }
    </div>  
  )
}

export default App
