import { useState } from 'react'
import './App.css'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'

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
        <div className='container-info'>
          <div className='container-info--item'>
            <span className='info-item--title'>Ip Address</span>
            <p>{locationData.ip}</p>
          </div>
          <div className='container-info--item'>
            <span className='info-item--title'>Location</span>
            <p>
            {locationData?.city}, {locationData?.region} - {locationData?.postalCode}
            </p>
          </div>
          <div className='container-info--item'>
            <span className='info-item--title'>Timezone</span>
            <p>UTC {locationData?.timezone}</p>
          </div>
          <div className='container-info--item'>
            <span className='info-item--title'>ISP</span>
            <p>{locationData?.isp}</p>
          </div>
        </div>
      }

      {locationData && 
        <div className='container-map'>
          <MapContainer center={[locationData.lat, locationData.lng]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[locationData.lat, locationData.lng]}>
              <Popup>
                Double click to zoom in
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      }
    </div>  
  )
}

export default App
