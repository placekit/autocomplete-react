import placekit from '@placekit/autocomplete-js';
import { useEffect, useRef, useState } from 'react';

export const usePlaceKit = (apiKey, options) => {
  if (
    !['object', 'undefined'].includes(typeof options) ||
    Array.isArray(options) ||
    options === null
  ) {
    throw Error('PlaceKit: `options` parameter is invalid, expected an object.');
  }

  const target = useRef(null);
  const [client, setClient] = useState();
  const [isFreeForm, setIsFreeForm] = useState(true);
  const [hasGeolocation, setHasGeolocation] = useState(false);

  useEffect(
    () => {
      if (!target.current) {
        return;
      }

      const { handlers, ...opts } = options || {};
      const pka = placekit(apiKey, {
        target: target.current,
        ...opts,
      })
        .on('open', handlers?.onOpen)
        .on('close', handlers?.onClose)
        .on('results', handlers?.onResults)
        .on('pick', handlers?.onPick)
        .on('error', handlers?.onError)
        .on('geolocation', (bool, pos) => {
          setHasGeolocation(bool);
          if (handlers?.onGeolocation) {
            handlers.onGeolocation(bool, pos);
          }
        })
        .on('freeForm', (bool) => {
          setIsFreeForm(bool);
          if (handlers?.onFreeForm) {
            handlers.onFreeForm(bool);
          }
        });
      setClient(pka);

      return () => {
        pka.destroy();
        setClient();
      };
    },
    [apiKey, options, target]
  );

  return {
    target,
    client,
    isFreeForm,
    hasGeolocation,
  };
};
