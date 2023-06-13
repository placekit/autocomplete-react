import placekitAutocomplete from '@placekit/autocomplete-js';
import { useEffect, useRef, useState } from 'react';

import { useStableValue } from './helpers';

export const usePlaceKit = (apiKey, options = {}) => {
  // throw error if invalid options
  if (
    typeof options !== 'object' ||
    Array.isArray(options) ||
    options === null
  ) {
    throw Error('PlaceKit: `options` parameter is invalid, expected an object.');
  }

  // init states
  const stableOptions = useStableValue(options);
  const target = useRef(null);
  const [client, setClient] = useState();
  const [state, setState] = useState({
    dirty: false,
    empty: true,
    freeForm: true,
    geolocation: false,
  });

  // mount PlaceKit Autocomplete JS
  useEffect(
    () => {
      if (!target.current) {
        return;
      }

      const pka = placekitAutocomplete(apiKey, {
        target: target.current,
      });
      setClient(pka);

      return () => {
        pka.destroy();
        setClient();
      };
    },
    [apiKey, target.current]
  );

  // run `pka.configure()` when options update
  useEffect(
    () => {
      if (!client) {
        return;
      }

      const { handlers, ...opts } = stableOptions || {};
      client
        .on('open', handlers?.onOpen)
        .on('close', handlers?.onClose)
        .on('results', handlers?.onResults)
        .on('pick', handlers?.onPick)
        .on('error', handlers?.onError)
        .on('dirty', handlers?.onDirty)
        .on('empty', handlers?.onEmpty)
        .on('freeForm', handlers?.freeForm)
        .on('geolocation', handlers?.onGeolocation)
        .on('state', (newState) => {
          setState({ ...newState });
          if (handlers?.onState) {
            handlers.onState({ ...newState });
          }
        })
        .configure(opts);

      // inject initial state from client
      setState({ ...client.state });
    },
    [client, stableOptions]
  );

  return {
    target,
    client,
    state,
  };
};
