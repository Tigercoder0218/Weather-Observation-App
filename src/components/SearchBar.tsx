import { FormEvent, useState, useEffect } from 'react'
import { FetchWeatherQuery, FetchWeatherPosition } from '../hooks/useFetchWeather';
import MapPin from './SVG/MapPin';
import { weather } from '../store/weatherStore';

const SearchBar = () => {
    const [query, setQuery] = useState<string>("")

    const HandleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // console.log(query);

        if (query) {
            const data = await FetchWeatherQuery(query);
            // console.log(data);
            weather.set(data)
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
                    const data = await FetchWeatherPosition(pos);
                    // console.log("LOC", data);
                    weather.set(data)
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log("User denied Geolocation")
                            break;

                        case error.POSITION_UNAVAILABLE:
                            console.log("Location info is unavailable")
                            break;

                        case error.TIMEOUT:
                            console.log("Request Timed Out")
                            break;

                        default:
                            console.log('Unable to access Location on this Browser');
                    }
                }
            )
        } else {
            console.log("No GeoLocation Support")
        }
    };

    useEffect(() => {
        HandleGeoLocation()
    }, [])

    return (
        <form onSubmit={HandleSearch} className="flex_center gap-2">
            <input
                type="text"
                onChange={(e) => setQuery(e.currentTarget.value)}
                className="w-full sm:min-w-[400px] min-h-[30px] px-4 rounded border-none outline-none text-black"
                placeholder="Search City"
            />

            <button type='button' className="p-1 hover:bg-black/60 rounded-full" onClick={HandleGeoLocation}>
                <MapPin width="25px" height="25px" />
            </button>
        </form>
    )
}

export default SearchBar