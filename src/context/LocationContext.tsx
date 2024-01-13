import React, { useContext } from "react";
import { ReactNode, createContext, useState } from "react";

interface Location {
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


interface LocationContextProps{
    children: ReactNode;
}

interface LocationContextValue {
    data: Location;
    setData: React.Dispatch<React.SetStateAction<Location>>
}

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

const LocationStorage: React.FC<LocationContextProps> =  ({ children })=> {
    const [data, setData] = useState<Location>({city: "Nova Friburgo", 
    country: "Brasil",
    geonameId: 223,
    lat: -22.28194,
    lng: -42.53111,
    postalCode:"28600-000",
    region:"Sudeste",
    timezone:"-05:00",
    isp: "SPACE X, FRIONLINE",
    ip: "192.223.174.002", });
    return (
        <LocationContext.Provider value={{ data, setData }}>
            {children}
        </LocationContext.Provider>
    )
}

const useLocationContext = () => {
    const context = useContext(LocationContext)
    if (!context) {
        throw new Error ('useLocationContext deve ser usado dentro de LocationStorage')
    }

    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { LocationStorage, useLocationContext }