import type { PKAClient, PKAHandlers, PKAOptions } from '@placekit/autocomplete-js';

type Handlers = {
  onOpen: PKAHandlers['open'];
  onClose: PKAHandlers['close'];
  onResults: PKAHandlers['results'];
  onPick: PKAHandlers['pick'];
  onError: PKAHandlers['error'];
  onEmpty: PKAHandlers['empty'];
  onFreeForm: PKAHandlers['freeForm'];
  onGeolocation: PKAHandlers['geolocation'];
};

export type PlaceKitProps = {
  apiKey: string;
  useGeolocation?: boolean;
  className?: string;
  options?: Omit<PKAOptions, 'target'>;
} & Partial<Handlers> & React.HTMLProps<HTMLInputElement>;

export type PlaceKitOptions = Omit<PKAOptions, 'target'> & {
  handlers?: Partial<Handlers>;
};

export type PlaceKitHooks = {
  target: React.RefObject<HTMLInputElement>;
  client: PKAClient;
  state: {
    isEmpty: boolean;
    isFreeForm: boolean;
    hasGeolocation: boolean;
  };
};

declare function PlaceKit(props: PlaceKitProps): JSX.Element;

declare function usePlaceKit(apiKey: string, options?: PlaceKitOptions): PlaceKitHooks;