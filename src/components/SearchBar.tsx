import type { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { FetchWeatherQuery, FetchWeatherPosition } from '../hooks/useFetchWeather';
import MapPin from './SVG/MapPin';
import { imageCode, weather } from '../store/weatherStore';

const SearchBar = () => {
    const [query, setQuery] = useState<string>("")

    const HandleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(query);

        if (query) {
            const data = await FetchWeatherQuery(query);
            // console.log(data);
            weather.set(data)
            imageCode.set(data?.weather[0]?.icon)
        }
    };

    const HandleGeoLocation = async () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
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
                },
                (error) => {
                    console.log("Error:", error);
                }
            )
        } else {
            console.log("No GeoLocation Support")
        }
    };

    useEffect(() => {
        //Get User Location automatically onLoad
        HandleGeoLocation()
    }, [])

    return (
        <>
            <form onSubmit={HandleSearch} className='w-full'>
                <input
                    type="text"
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    className="w-full sm:min-w-[400px] h-[35px] px-4 rounded border-none outline-none text-black"
                    placeholder="Search City"
                />
            </form>

            <button type='button' className="sm:hidden p-1 bg-black/20 rounded" onClick={HandleGeoLocation}>
                <MapPin width="28px" height="28px" />
            </button>
        </>
    )
}

export default SearchBar