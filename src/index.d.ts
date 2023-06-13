import type { PKAClient, PKAHandlers, PKAOptions, PKAState } from '@placekit/autocomplete-js';

type Handlers = {
  onOpen: PKAHandlers['open'];
  onClose: PKAHandlers['close'];
  onResults: PKAHandlers['results'];
  onPick: PKAHandlers['pick'];
  onError: PKAHandlers['error'];
  onDirty: PKAHandlers['dirty'];
  onEmpty: PKAHandlers['empty'];
  onFreeForm: PKAHandlers['freeForm'];
  onGeolocation: PKAHandlers['geolocation'];
  onState: PKAHandlers['state'];
};

export type PlaceKitProps = {
  apiKey: string;
  useGeolocation?: boolean;
  className?: string;
  options?: Omit<PKAOptions, 'target'>;
  onClient?: (client?: PKAClient) => void;
} & Partial<Handlers> & React.HTMLProps<HTMLInputElement>;

export type PlaceKitOptions = Omit<PKAOptions, 'target'> & {
  handlers?: Partial<Handlers>;
};

export type PlaceKitHooks = {
  target: React.RefObject<HTMLInputElement>;
  client: PKAClient;
  state: PKAState;
};

declare function PlaceKit(props: PlaceKitProps): JSX.Element;

declare function usePlaceKit(apiKey: string, options?: PlaceKitOptions): PlaceKitHooks;