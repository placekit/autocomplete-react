import { PlaceKit } from '@placekit/autocomplete-react';
import { useCallback, useState } from 'react';

const App = () => {
  const [country, setCountry] = useState({});

  const handlePick = useCallback(
    (_, item) => {
      setCountry({
        name: item.name,
        code: item.countrycode,
      });
    },
    []
  );

  const handleEmpty = useCallback(
    (empty) => {
      if (empty) {
        setCountry({});
      }
    },
    []
  );

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <PlaceKit
        apiKey={import.meta.env.VITE_PLACEKIT_API_KEY}
        useGeolocation={false}
        options={{
          types: ['country'],
          // countryAutoFill: false, // uncomment to prevent automatic country detection
        }}
        onPick={handlePick}
        onEmpty={handleEmpty}
        className="w-96"
      />
      <p>
        Country code: <b>{country.code || 'N/A'}</b>
      </p>
    </div>
  );
};

export default App;