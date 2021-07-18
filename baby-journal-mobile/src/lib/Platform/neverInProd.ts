import Constants from 'expo-constants';

export const isStaging = Constants.manifest?.extra?.isStaging as boolean;

// safety function to ensure optional input value is NEVER `true` in prod
export function neverInProd(value = true) {
  const inStagingOrDev = isStaging || __DEV__;
  // if we are in prod, always return false
  if (!inStagingOrDev) {
    return false;
  }
  // if we are in staging or dev, return given value
  return value;
}
