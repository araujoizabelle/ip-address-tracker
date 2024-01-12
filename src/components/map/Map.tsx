import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'


export const Map: React.FC<{lat:number, lng: number}> = ({lat, lng}) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
            <Popup>
                Double click to zoom in
            </Popup>
        </Marker>
    </MapContainer>  
  )
}