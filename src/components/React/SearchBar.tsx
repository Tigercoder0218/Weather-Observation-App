import type { FormEvent } from 'react'
import { useState, useEffect, useRef } from 'react'
import { FetchWeatherQuery, FetchWeatherPosition } from '../../hooks/useFetchWeather';
import MapPin from '../SVG/MapPin';
import { weather } from '../../store/weatherStore';
import { toast } from 'react-hot-toast';
import { weatherIconCode } from '../../hooks/useIconCode';

const SearchBar = () => {
    const [query, setQuery] = useState<string>("mangalore")
    const SearchRef = useRef<HTMLInputElement>(null)

    const HandleSearch = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        if (!query) return

        const data = await FetchWeatherQuery(query);
        // console.log("DOTAAA", data);
        if (data) {
            weather.set(data)
            weatherIconCode()
            SearchRef.current?.blur()
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
            weatherIconCode()
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

        // If geolocation access is denied, fetch results for "mangalore" by default
        if (query == "") setQuery("Mangalore")
        HandleSearch()
    }

    const HandleGeoLocation = async () => {
        if (SearchRef.current?.value) {
            //Reset Searchbar value on geolocation btn click
            SearchRef.current.value = ""
        }

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
        // HandleGeoLocation()

        // Initial Fetch
        if (query == "") setQuery("Mangalore")
        HandleSearch()
    }, [])

    return (
        <div className='flex_center gap-4 w-full sm:max-w-[400px]'>
            <form onSubmit={HandleSearch} className='w-full'>
                <input
                    type="text"
                    name='search-city'
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    className="w-full h-[35px] px-4 rounded border-none outline-none text-black"
                    placeholder="Search City"
                    ref={SearchRef}
                />
            </form>

            <button type='button' title='Current Location' className="p-1 bg-black/20 rounded" onClick={HandleGeoLocation}>
                <MapPin width="28px" height="28px" />
            </button>
        </div>
    )
}

export default SearchBar