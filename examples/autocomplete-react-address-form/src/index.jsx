import { createRoot } from 'react-dom/client';

import './global.css';
import '@placekit/autocomplete-js/dist/placekit-autocomplete.css';

import AddressForm from './AddressForm';

const App = () => (
  <div className="max-w-md mx-auto">
    <AddressForm />
  </div>
);

const app = document.getElementById('app');
const root = createRoot(app);
root.render(<App />);
