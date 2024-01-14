import { LocationData } from "./LocationDataInterface";

export interface LocationContextValue {
    data: LocationData;
    setData: React.Dispatch<React.SetStateAction<LocationData>>
}