const isStaging = process.env.NX_IS_STAGING === 'true';
const buildType = process.env.NX_BUILD_TYPE as 'local' | 'qa' | 'staging' | 'production';

export const EE_GeneralEnv = {
  // service config eg Sentry, Firebase goes here
  bugsnag: {
    apiKey: process.env.NX_BUGSNAG_API_KEY,
  },
  amplitude: {
    apiKey: process.env.NX_AMPLITUDE_API_KEY,
  },
  firebase: {
    apiKey: process.env.NX_FIREBASE_API_KEY,
    authDomain: process.env.NX_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NX_FIREBASE_DATABASE_URL,
    projectId: process.env.NX_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NX_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NX_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NX_FIREBASE_APP_ID,
    measurementId: process.env.NX_FIREBASE_MEASUREMENT_ID,
  },
  sharedResourcePrefix: process.env.NX_SHARING_DOMAIN,
  isStaging,
  buildType,
} as const;

export const EE_MobileEnv = {
  // Mobile / App specific stuff goes here
  name: process.env.NX_APP_NAME,
  slug: process.env.NX_EXPO_SLUG,
  scheme: process.env.NX_LINKING_SCHEME,
  icon: process.env.NX_ICON_NAME,
  ios: {
    bundleIdentifier: process.env.NX_BUNDLE_ID_IOS,
    googleServicesFile: process.env.NX_GOOGLE_SERVICES_IOS,
  },
  android: {
    adaptiveIcon: {
      backgroundColor:
        EE_GeneralEnv.buildType === 'staging'
          ? '#14A05D'
          : EE_GeneralEnv.buildType === 'qa'
          ? '#4A90E2'
          : '#FCCD48',
    },
    package: process.env.NX_BUNDLE_ID_ANDROID,
    googleServicesFile: process.env.NX_GOOGLE_SERVICES_ANDROID,
  },
  splash: {
    backgroundColor:
      EE_GeneralEnv.buildType === 'staging'
        ? '#14A05D'
        : EE_GeneralEnv.buildType === 'qa'
        ? '#4A90E2'
        : '#FCCD48',
  },
  web: {
    config: {
      firebase: {
        apiKey: process.env.NX_FIREBASE_API_KEY,
        measurementId: process.env.NX_FIREBASE_MEASUREMENT_ID,
      },
    },
  },
} as const;
