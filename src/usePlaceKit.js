import placekitAutocomplete from '@placekit/autocomplete-js';
import { useEffect, useRef, useState } from 'react';

import { useStableValue } from './useStableValue';

export const usePlaceKit = (apiKey, options = {}) => {
  const stableOptions = useStableValue(options);
  
  if (
    !['object', 'undefined'].includes(typeof stableOptions) ||
    Array.isArray(stableOptions) ||
    stableOptions === null
  ) {
    throw Error('PlaceKit: `options` parameter is invalid, expected an object.');
  }

  const target = useRef(null);
  const [client, setClient] = useState();
  const [state, setState] = useState({
    isEmpty: true,
    isFreeForm: true,
    hasGeolocation: false,
  });
  
  useEffect(
    () => {
      if (!target.current) {
        return;
      }

      const { handlers, ...opts } = stableOptions || {};
      const pka = placekitAutocomplete(apiKey, {
        target: target.current,
        ...opts,
      })
        .on('open', handlers?.onOpen)
        .on('close', handlers?.onClose)
        .on('results', handlers?.onResults)
        .on('pick', handlers?.onPick)
        .on('error', handlers?.onError)
        .on('empty', (bool) => {
          setState((prev) => ({
            ...prev,
            isEmpty: bool,
          }));
          if (handlers?.onEmpty) {
            handlers.onEmpty(bool);
          }
        })
        .on('freeForm', (bool) => {
          setState((prev) => ({
            ...prev,
            isFreeForm: bool,
          }));
          if (handlers?.onFreeForm) {
            handlers.onFreeForm(bool);
          }
        })
        .on('geolocation', (bool, pos) => {
          setState((prev) => ({
            ...prev,
            hasGeolocation: bool,
          }));
          if (handlers?.onGeolocation) {
            handlers.onGeolocation(bool, pos);
          }
        });
      setClient(pka);

      return () => {
        pka.destroy();
        setClient();
      };
    },
    [apiKey, stableOptions, target.current]
  );

  return {
    target,
    client,
    state,
  };
};
