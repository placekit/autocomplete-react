import { createRoot } from 'react-dom/client';

import './global.css';
import '@placekit/autocomplete-js/dist/placekit-autocomplete.css';

import { PlaceKit } from '@placekit/autocomplete-react';

const App = () => (
  <div className="flex justify-center">
    <PlaceKit
      apiKey={process.env.PLACEKIT_API_KEY}
      options={{
        countries: ['fr'],
      }}
      className="w-96"
    />
  </div>
);

const app = document.getElementById('app');
const root = createRoot(app);
root.render(<App />);
