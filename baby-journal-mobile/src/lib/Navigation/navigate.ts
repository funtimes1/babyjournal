import { createNavigationContainerRef } from '@react-navigation/native';

import { RootStackParamsList } from '../../navigation/Root/Root.navigator';
import { useNav } from '../../navigation/useNav';

// export const navigationRef = React.createRef<NavigationContainerRef>();
type navType = ReturnType<typeof useNav>['navigate'];

export const navigationRef = createNavigationContainerRef<RootStackParamsList>();

function nav(
  ...args:
    | [screen: keyof RootStackParamsList]
    | [screen: keyof RootStackParamsList, params: undefined]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}
export const navigate = nav as navType;
