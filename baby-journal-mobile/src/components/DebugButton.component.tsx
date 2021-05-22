import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNav } from '../navigation/useNav';
import { useDebugStore } from '../stores/Debug.store';
import { Icon } from './Icons/Icon';
import { Layout } from './Layout.components';

export const DebugButton: React.FC = () => {
  const { debugShowDebugButton } = useDebugStore();
  const { top } = useSafeAreaInsets();
  const { navigate } = useNav<'Loaded'>();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
    return () => {
      translateX.value = 0;
      translateY.value = 0;
    };
  }, []);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: { offsetX: number; offsetY: number }) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.offsetX + event.translationX;
      translateY.value = ctx.offsetY + event.translationY;
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });
  return (
    <>
      {debugShowDebugButton && (
        <PanGestureHandler {...{ onGestureEvent }}>
          <Animated.View style={[{ position: 'absolute', top: top + 4, right: 8 }, style]}>
            <Layout.PressableColumn
              onPress={() => {
                navigate('Debug');
              }}
              bg="haze"
              shadow
              radius={32}
              px={6}
              py={6}
              center
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Icon name="bug-outline" size={28} />
            </Layout.PressableColumn>
          </Animated.View>
        </PanGestureHandler>
      )}
    </>
  );
};
