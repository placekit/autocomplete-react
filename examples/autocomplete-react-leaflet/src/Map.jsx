import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';

import { PlaceKit } from '@placekit/autocomplete-react';

const Map = () => {
  const map = useRef(null);
  const [coords, setCoords] = useState(null);

  useEffect(
    () => {
      if (coords && map.current) {
        map.current.setView(coords, 17);
      }
    },
    [coords, map]
  );

  return (
    <div className="relative w-[600px]">
      <div className="absolute top-2 left-2 w-96 z-[500]">
        <PlaceKit
          apiKey={process.env.PLACEKIT_API_KEY}
          onPick={(_, item) => setCoords({
            lat: item.lat,
            lng: item.lng,
          })}
          onGeolocation={(_, pos) => setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })}
        />
      </div>
      <MapContainer
        center={[48.870820, 2.304442]}
        zoom={14}
        scrollWheelZoom={false}
        zoomControl={false}
        ref={map}
        className="h-[400px]"
      >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <ZoomControl
          position="topright"
        />
        {!!coords && (
          <Marker position={[coords.lat, coords.lng]} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;