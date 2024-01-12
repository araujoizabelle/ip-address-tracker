import "./CardInformations.css"
interface locationData {
    city: string, 
    country: string,
    postalCode:string,
    region:string,
    timezone:string,
    isp: string,
    ip: string,
}

export const CardInformations: React.FC<locationData> = ({ip, city, region, postalCode, timezone, isp}) => {

    return (
        <div className='container-info'>
          <div className='container-info--item'>
            <span className='info-item--title'>Ip Address</span>
            <p>{ip}</p>
          </div>
          <div className='container-info--item'>
            <span className='info-item--title'>Location</span>
            <p>
            {city}, {region} - {postalCode}
            </p>
          </div>
          <div className='container-info--item'>
            <span className='info-item--title'>Timezone</span>
            <p>UTC {timezone}</p>
          </div>
          <div className='container-info--item'>
            <span className='info-item--title'>ISP</span>
            <p>{isp}</p>
          </div>
        </div>
    )
}