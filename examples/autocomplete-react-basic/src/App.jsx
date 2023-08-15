import { PlaceKit } from '@placekit/autocomplete-react';

const App = () => (
  <div className="flex justify-center">
    <PlaceKit
      apiKey={import.meta.env.VITE_PLACEKIT_API_KEY}
      className="w-96"
    />
  </div>
);

export default App;