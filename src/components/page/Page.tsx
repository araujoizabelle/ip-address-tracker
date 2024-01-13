import { useState } from 'react'
import './Page.css'
import { Map } from '../map/Map';
import { CardInformations } from '../cardInformations/CardInformations';
import { useFetchLocation } from '../../hooks/useFetchLocation';
import { useLocationContext } from '../../context/LocationContext';
import { ToastContainer, toast } from 'react-toastify';
/**
 * TODO: 
 * 1- Marker automatically change on search
 * 2- skeleton screen to load the content
 * 4- reorganize components, hooks and interfaces   
 */


export const Page = () => {
    const {data, setData} = useLocationContext();
    const [searchValue, setSearchValue] = useState('');
    const {request, error, loading} = useFetchLocation(setData, searchValue);

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
    
      {loading && <div> LOADING </div>}

      {error &&  <ToastContainer position="bottom-right" theme="colored" />}

      {data && data.lat && data.lng &&
        <CardInformations 
          ip={data.ip} 
          postalCode={data.postalCode}
          city={data.city} 
          timezone={data.timezone}
          region={data.region}
          country={data.country}
          isp={data.isp}
        />
      }

      {data && data.lat && data.lng && 
        <div className='container-map'>
          <Map lat={data.lat} lng={data.lng}/>
        </div>
      }
    </div>
  )
}
