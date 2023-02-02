import { createRoot } from 'react-dom/client';

import './global.css';
import '@placekit/autocomplete-js/dist/placekit-autocomplete.css';

import { PlaceKit } from '@placekit/autocomplete-react';
import tzc from '@placekit/tzc';

const App = () => (
  <div className="flex justify-center">
    <PlaceKit
      apiKey={process.env.PLACEKIT_API_KEY}
      options={{
        countries: [tzc()], // get country code from user's timezone
      }}
      className="w-96"
    />
  </div>
);

const app = document.getElementById('app');
const root = createRoot(app);
root.render(<App />);
