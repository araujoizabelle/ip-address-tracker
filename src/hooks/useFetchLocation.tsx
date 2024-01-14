import { useState } from "react";
import { LocationData } from "../interfaces/LocationDataInterface";


const apiKey = process.env.apikey;

export const useFetchLocation = (setData: React.Dispatch<React.SetStateAction<LocationData>>, searchValue?: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${searchValue}`

    const request = async (options?: any) => {
        try {
            setLoading(true);
            const dados = await fetch(url, options);
            const data = await dados.json();
            if (data.latitude && data.longitude) {
                setData(data); 
            }
        } catch (e: any) {
            setError(true);
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return {loading, error, request}
}
