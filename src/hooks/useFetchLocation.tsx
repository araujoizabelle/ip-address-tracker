import { useState } from "react";

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

const apiKey = process.env.apikey;

export const useFetchLocation = (setData: React.Dispatch<React.SetStateAction<Location>>, searchValue?: string) => {
    const [loading, setLoading] = useState(false);
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${searchValue}`

    const request = async (options?: any) => {
        try {
            setLoading(true);
            const dados = await fetch(url, options);
            const { location, isp, ip } = await dados.json();
            setData({...location, isp, ip}); 
        } catch (e) {
            console.log('error on fetch', e)
            throw e;
        } finally {
            setLoading(false);
        }
    }

    return {loading, request}
}
