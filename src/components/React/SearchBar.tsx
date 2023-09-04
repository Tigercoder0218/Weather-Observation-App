import type { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { FetchWeatherQuery, FetchWeatherPosition } from '../../hooks/useFetchWeather';
import MapPin from '../SVG/MapPin';
import { imageCode, weather } from '../../store/weatherStore';
import { toast } from 'react-hot-toast';

const SearchBar = () => {
    const [query, setQuery] = useState<string>("karnataka")

    const HandleSearch = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        // console.log(query);

        if (query) {
            const data = await FetchWeatherQuery(query);
            // console.log(data);
            weather.set(data)
            imageCode.set(data?.weather[0]?.icon)
        }
    };

    const setPosition = async (position: any) => {
        const pos = {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
        }

        try {
            const data = await FetchWeatherPosition(pos);
            weather.set(data)
            imageCode.set(data?.weather[0]?.icon)
        } catch (error) {
            console.log(error)
        }
    }

    const handleError = (error: any) => {
        console.log("Error:", error);
        switch (error.code) {
            case error.PERMISSION_DENIED: toast.error(error.message)
                break;
            case error.POSITION_UNAVAILABLE: toast.error(error.message)
                break;
            case error.TIMEOUT: toast.error(error.message)
                break;
            default: toast.error(error.message)
        }

        // If geolocation access is denied, fetch results for "karnataka" by default
        HandleSearch()
    }

    const HandleGeoLocation = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                setPosition, handleError,
                { enableHighAccuracy: true, maximumAge: 10000 })
        } else {
            console.log("No GeoLocation Support")
            toast.error("No GeoLocation Support")
        }
    };

    useEffect(() => {
        //Get User Location automatically onLoad
        HandleGeoLocation()
    }, [])

    return (
        <div className='flex_center gap-4 w-full'>


            <form onSubmit={HandleSearch} className='w-full sm:max-w-[400px]'>
                <input
                    type="text"
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    className="w-full  h-[35px] px-4 rounded border-none outline-none text-black"
                    placeholder="Search City"
                />
            </form>

            <button type='button' className="p-1 bg-black/20 rounded" onClick={HandleGeoLocation}>
                <MapPin width="28px" height="28px" />
            </button>
        </div>
    )
}

export default SearchBar