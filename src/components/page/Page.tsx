import { useState } from 'react'
import './Page.css'
import { Map } from '../map/Map';
import { CardInformations } from '../cardInformations/CardInformations';
import { useFetchLocation } from '../../hooks/useFetchLocation';
import { useLocationContext } from '../../context/LocationContext';
import { ToastContainer, toast } from 'react-toastify';

/**
 * TODO: 
 * 1- make api agnostic
 * 2- reorganize components, hooks and interfaces   
 * 3- do the tests
 */


export const Page = () => {
    const {data, setData} = useLocationContext();
    const [searchValue, setSearchValue] = useState('');
    const {request, error, loading} = useFetchLocation(setData, searchValue);

    const {
      city, 
      country_code2,
      latitude,
      longitude,
      zipcode, 
      time_zone, 
      isp, ip} = data;

  const handleSearch = async () => {
    try {
        await request()
    } catch (e: any) {
        console.error("error on request func", e)
        toast.error(`Error: ${e.message}`)
    }
  }

  return (
    <div className='container'>
      <div className='container-search'>
        <h1 className='title'>IP Address Tracker</h1>
        <input type='text' placeholder='Search for any IP address or domain' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
        <button onClick={handleSearch}> <img src='src/assets/images/icon-arrow.svg'/> </button>
      </div>
    
      {loading && 
        <div className="skeleton-container">
          <div className="skeleton-item search"></div>
          <div className="skeleton-item map"></div>
        </div>
    }

      {error &&  <ToastContainer position="bottom-right" theme="colored" />}

      {!loading && latitude && longitude &&
        <CardInformations 
          ip={ip} 
          zipcode={zipcode}
          city={city} 
          time_zone={time_zone}
          country_code2={country_code2}
          isp={isp}
          latitude={latitude}
          longitude={longitude}
        />
      }

      {!loading && latitude && longitude &&
        <div className='container-map'>
          <Map lat={Number(latitude)} lng={Number(longitude)}/>
        </div>
      }
    </div>
  )
}
