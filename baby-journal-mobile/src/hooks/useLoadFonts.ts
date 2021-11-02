import {
  IBMPlexMono_300Light,
  IBMPlexMono_400Regular,
  IBMPlexMono_700Bold,
} from '@expo-google-fonts/ibm-plex-mono';
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from '@expo-google-fonts/open-sans';
import { useFonts } from 'expo-font';

export function useLoadFonts() {
  const [loaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    IBMPlexMono_300Light,
    IBMPlexMono_400Regular,
    IBMPlexMono_700Bold,
  });

  return !loaded;
}
