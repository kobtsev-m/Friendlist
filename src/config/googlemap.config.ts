import { GoogleMapProps, LoadScriptProps } from '@react-google-maps/api';

export const googleMapOptions: GoogleMapProps['options'] = {
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  keyboardShortcuts: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  rotateControl: false,
  clickableIcons: false,
  gestureHandling: 'greedy'
};

export const googleMapsConfig: LoadScriptProps = {
  id: 'google-maps-script',
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  libraries: ['places'],
  language: 'ru'
};
