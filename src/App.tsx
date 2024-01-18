import { useFetchLocation } from './hooks/useFetchLocation';
import { useLocationContext } from './context/LocationContext';

import { Map } from './components/map/Map';
import { CardInformations } from './components/cardInformations/CardInformations';
import { ToastContainer, toast } from 'react-toastify';
import { Skeleton } from './components/skeleton/Skeleton';
import { InputSearch } from './components/inputSearch/InputSearch';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';

/**
 * TODO: 
 * 2- reorganize components, hooks and interfaces   
 * 3- do the tests
 */


export const App = () => {
    const {data, setData} = useLocationContext();
    const {request, error, loading} = useFetchLocation(setData);
    console.log('error', error)
    const {
      city, 
      country_code2,
      latitude,
      longitude,
      zipcode, 
      time_zone, 
      isp, ip} = data;

  const handleSearch = async () => {
    console.log("handleSearch")
    try {
        await request()
    } catch (e: any) {
        console.error("error on request func", e)
        toast.error(`Error: ${e.message}`)
    }
  }

  return (
    <div className='container'>

      <InputSearch onSearch={handleSearch}/>

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

      {loading && <Skeleton/>}
      {error &&  <ToastContainer position="bottom-right" theme="colored" />}
    </div>
  )
}