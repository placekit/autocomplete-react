import { PlaceKit } from '@placekit/autocomplete-react';
import { useCallback, useState } from 'react';

const App = () => {
  const [country, setCountry] = useState('fr');

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <div className="max-w-lg flex items-center gap-2">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="h-[2.375rem] rounded-md border border-gray-300 text-sm"
        >
          <option value="">Select country</option>
          <option value="fr">France</option>
          <option value="be">Belgium</option>
          <option value="ch">Swiss</option>
        </select>
        <PlaceKit
          apiKey={import.meta.env.VITE_PLACEKIT_API_KEY}
          geolocation={false}
          options={{
            countries: [country],
            countrySelect: false,
          }}
          disabled={!country}
          className="w-96"
        />
      </div>
    </div>
  );
};

export default App;