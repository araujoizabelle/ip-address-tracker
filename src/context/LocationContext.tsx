import React, { useContext } from "react";
import { ReactNode, createContext, useState } from "react";
import { LocationData } from "../interface";

interface LocationContextProps{
    children: ReactNode;
}

interface LocationContextValue {
    data: LocationData;
    setData: React.Dispatch<React.SetStateAction<LocationData>>
}

const LocationContext = createContext<LocationContextValue | undefined>(undefined);

const LocationStorage: React.FC<LocationContextProps> =  ({ children })=> {
    const [data, setData] = useState<LocationData>({
            ip: "23.110.166.209",
            country_code2: "US",
            city: "Los Angeles",
            zipcode: "90012-2904",
            latitude: "34.05855",
            longitude: "-118.23671",
            isp: "LeaseWeb USA, Inc. Los Angeles",
            time_zone: {
                offset: -8
            }
        }
    );
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