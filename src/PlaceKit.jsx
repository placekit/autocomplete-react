import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useEffect } from 'react';

import { usePlaceKit } from './usePlaceKit';

const PlaceKit = forwardRef(
  (
    {
      apiKey,
      className,
      geolocation,
      options,
      onClient,
      onOpen,
      onClose,
      onResults,
      onPick,
      onError,
      onCountryChange,
      onDirty,
      onEmpty,
      onFreeForm,
      onGeolocation,
      onCountryMode,
      onState,
      ...inputProps
    },
    ref,
  ) => {
    const { target, client, state } = usePlaceKit(apiKey, {
      ...options,
      handlers: {
        onOpen,
        onClose,
        onResults,
        onPick,
        onError,
        onCountryChange,
        onDirty,
        onEmpty,
        onFreeForm,
        onGeolocation,
        onCountryMode,
        onState,
      },
    });

    // update default value (only if untouched)
    useEffect(() => {
      if (client && !client.state.dirty) {
        client.setValue(inputProps.defaultValue);
      }
    }, [inputProps.defaultValue, client]);

    // forward ref from `target`
    useEffect(() => {
      if (target.current && ref) {
        if (typeof ref === 'function') {
          ref(target.current);
        } else {
          ref.current = target.current;
        }
      }
    }, [target.current]);

    // pass client to `onClient` when it updates
    useEffect(() => {
      if (onClient?.call) {
        onClient(client);
      }
    }, [client, onClient]);

    // toggle geolocation
    const toggleGeolocation = useCallback(() => {
      if (client) {
        if (client.state.geolocation) {
          client.clearGeolocation();
        } else {
          client.requestGeolocation();
        }
      }
    }, [client]);

    return (
      <div className={['pka-input', className].filter((c) => c).join(' ')}>
        {!!geolocation && (
          <button
            type="button"
            className={['pka-input-geolocation', state.geolocation ? 'pka-enabled' : '']
              .join(' ')
              .trim()}
            title="Activate geolocation"
            role="switch"
            aria-checked={state.geolocation}
            onClick={toggleGeolocation}
            disabled={inputProps.disabled}
          >
            <span className="pka-sr-only">Activate geolocation</span>
          </button>
        )}
        <button
          type="button"
          className="pka-input-clear"
          title="Clear value"
          aria-hidden={state.empty}
          onClick={client?.clear}
          disabled={inputProps.disabled}
        >
          <span className="pka-sr-only">Clear value</span>
        </button>
        <input {...inputProps} type="search" ref={target} />
      </div>
    );
  },
);

PlaceKit.defaultProps = {
  geolocation: true,
  options: {},
  placeholder: 'Search places...',
};

PlaceKit.propTypes = {
  // component options
  geolocation: PropTypes.bool,
  className: PropTypes.string,

  // PlaceKit Autocomplete JS options
  apiKey: PropTypes.string.isRequired,
  options: PropTypes.shape({
    panel: PropTypes.shape({
      className: PropTypes.string,
      offset: PropTypes.number,
      strategy: PropTypes.oneOf(['absolute', 'fixed']),
      flip: PropTypes.bool,
    }),
    format: PropTypes.shape({
      flag: PropTypes.func,
      icon: PropTypes.func,
      sub: PropTypes.func,
      noResults: PropTypes.func,
      applySuggestion: PropTypes.string,
      cancel: PropTypes.string,
    }),
    countryAutoFill: PropTypes.bool,
    countrySelect: PropTypes.bool,
    timeout: PropTypes.number,
    maxResults: PropTypes.number,
    types: PropTypes.arrayOf(PropTypes.string),
    language: PropTypes.string,
    countries: PropTypes.arrayOf(PropTypes.string),
    coordinates: PropTypes.string,
  }),

  // event handlers
  onClient: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onResults: PropTypes.func,
  onPick: PropTypes.func,
  onError: PropTypes.func,
  onDirty: PropTypes.func,
  onEmpty: PropTypes.func,
  onFreeForm: PropTypes.func,
  onGeolocation: PropTypes.func,
  onCountryMode: PropTypes.func,
  onState: PropTypes.func,
  onCountryChange: PropTypes.func,

  // other HTML input props get forwarded
};

export default PlaceKit;
