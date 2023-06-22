import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import { useCallback, useEffect, useRef, useState } from 'react';

import { PlaceKit } from '@placekit/autocomplete-react';

const App = () => {
  const map = useRef(null);
  const [coords, setCoords] = useState(null);

  useEffect(
    () => {
      if (coords && map.current) {
        map.current.setView(coords, 16);
      }
    },
    [coords, map]
  );

  const handlePick = useCallback(
    (_, item) => {
      const [lat, lng] = item.coordinates.split(',');
      setCoords([lat, lng]);
    },
    []
  );

  const handleGeolocation = useCallback(
    (_, pos) => {
      setCoords([pos.coords.latitude, pos.coords.longitude]);
    },
    []
  );

  return (
    <div className="relative w-[600px]">
      <div className="absolute top-2 left-2 w-96 z-[500]">
        <PlaceKit
          apiKey={import.meta.env.VITE_PLACEKIT_API_KEY}
          options={{
            countries: ['fr'],
          }}
          onPick={handlePick}
          onGeolocation={handleGeolocation}
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
          <Marker position={coords} />
        )}
      </MapContainer>
    </div>
  );
};

export default App;