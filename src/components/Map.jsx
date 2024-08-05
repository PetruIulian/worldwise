/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useCities } from '../context/CitiesContext'
import useGeolocation from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/userUrlPosition'

function Map() {

    const { cities } = useCities()
    const [mapPosition, setMapPosition] = useState([40.46635901755316, -3.7133789062500004])
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

    const [mapLat, mapLng] = useUrlPosition();

    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([mapLat, mapLng])
        }
    }, [mapLat, mapLng])

    useEffect(() => {
        if (geolocationPosition) {
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
        }
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && (
                <Button type="position" onClick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "Use current position"}
                </Button>
            )}
            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                {mapLat && mapLng && <ChangeCenter position={mapPosition} />}
                <DetectClick />
            </MapContainer>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate()
    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    })
}

export default Map
