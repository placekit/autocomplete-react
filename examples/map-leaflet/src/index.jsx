import { createRoot } from 'react-dom/client';

import './global.css';
import '@placekit/autocomplete-js/dist/placekit-autocomplete.css';

import Map from './Map';

const App = () => (
  <div className="flex justify-center">
    <Map />
  </div>
);

const app = document.getElementById('app');
const root = createRoot(app);
root.render(<App />);
