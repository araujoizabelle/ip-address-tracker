import { useState } from "react";

interface location {
    city: string, 
    country: string,
    geonameId: number,
    lat: number,
    lng:number,
    postalCode:string,
    region:string,
    timezone:string
  }

const apiKey = process.env.apikey;

const useFetch = () => {
    const [data, setData] = useState<location>();
    const [error, setError] = useState<unknown>(null);
    const [loading, setLoading] = useState(false);
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${searchValue}`

    async function request(options: any) {
        try {
            setLoading(true);
            const dados = await fetch(url, options);
            setData(await dados.json());    
        } catch (error: unknown) {
            setError(error);
        } finally {
            setLoading(false);
        }
        
    }

    return {data, error, loading, request}
}

export default useFetch;