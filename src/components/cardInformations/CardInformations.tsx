import "./CardInformations.css"
import { LocationData } from "../../interfaces/LocationDataInterface"

export const CardInformations: React.FC<LocationData> = ({ip, city, zipcode, country_code2, time_zone, isp}) => {

    return (
        <div className='container-info'>
          <div className='container-info--item'>
            <span className='info-item--title'>Ip Address</span>
            <p>{ip}</p>
          </div>
          <div className='container-info--item'>
            <span className='info-item--title'>Location</span>
            <p>
            {city}, {country_code2} - {zipcode}
            </p>
          </div>
          <div className='container-info--item'>
            <span className='info-item--title'>Timezone</span>
            <p>UTC {String(time_zone.offset).replace(/^(-?\d)$/, '$1:00')}</p>
          </div>
          <div className='container-info--item'>
            <span className='info-item--title'>ISP</span>
            <p>{isp}</p>
          </div>
        </div>
    )
}