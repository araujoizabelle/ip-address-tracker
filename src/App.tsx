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
 * 2- css 
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
        <input type='text' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
        <button onClick={handleSearch}> &gt; </button>
      </div>

      {locationData && 
        <div className='container-info'>
          <div className='container-info--item'>
            <div>Ip Address</div>
            <div>{locationData.ip}</div>
          </div>
          <div className='container-info--item'>
            <div>Location</div>
            <div>
            {locationData?.city}, {locationData?.region} - {locationData?.postalCode}
            </div>
          </div>
          <div className='container-info--item'>
            <div>Timezone</div>
            <div>{locationData?.timezone}</div>
          </div>
          <div className='container-info--item'>
            <div>ISP</div>
            <div>{locationData?.isp}</div>
          </div>
        </div>
      }

      {locationData && 
        <div className='container-map'>
          <MapContainer style={{height: '300px' }} center={[locationData.lat, locationData.lng]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[locationData.lat, locationData.lng]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      }
    </div>  
  )
}

export default App
