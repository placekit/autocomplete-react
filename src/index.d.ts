import type { PKAClient, PKAHandlers, PKAOptions } from '@placekit/autocomplete-js';

type Handlers = {
  onOpen: PKAHandlers['open'];
  onClose: PKAHandlers['close'];
  onResults: PKAHandlers['results'];
  onPick: PKAHandlers['pick'];
  onError: PKAHandlers['error'];
  onFreeForm: PKAHandlers['freeForm'];
  onGeolocation: PKAHandlers['geolocation'];
};

export type PlaceKitProps = {
  apiKey: string;
  useGeolocation?: boolean;
  className?: string;
  options?: PKAOptions;
} & Partial<Handlers>;

declare function PlaceKit(props: PlaceKitProps): JSX.Element;

declare function usePlaceKit(apiKey: string, options?: PKAOptions & {
  handlers?: Partial<Handlers>;
}): {
  target: React.RefObject<HTMLInputElement>,
  client: PKAClient,
  isFreeForm: boolean;
  hasGeolocation: boolean;
};