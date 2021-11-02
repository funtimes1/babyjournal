import React from 'react';
import { ActivityIndicator } from 'react-native';

// export type LoadingProps = {
//   height?: number;
//   onFinish?: () => void;
//   loop?: boolean;
// };

// export const LoadingIndicator: React.FC<LoadingProps> = (props) => {
//   const { height = 100, onFinish, loop = false } = props;
//   const animationRef = React.useRef<LottieView>(null);
//   React.useEffect(() => {
//     animationRef.current?.play(0, 50);
//   }, []);
//   return (
//     <LottieView
//       ref={animationRef}
//       style={{ height, backgroundColor: 'red' }}
//       loop={loop}
//       source={require('../../assets/loading-animation.json')}
//       onAnimationFinish={onFinish}
//     />
//   );
// };

export const LoadingIndicator: React.FC = () => <ActivityIndicator size="small" />;
