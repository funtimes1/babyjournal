import throttle from "lodash/throttle";
import React from "react";

export function useThrottle(cb: () => void | Promise<void>, delay: number) {
  const options = { leading: true, trailing: false }; // add custom lodash options
  const cbRef = React.useRef(cb);
  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  React.useEffect(() => {
    cbRef.current = cb;
  });
  return React.useCallback(
    throttle(() => cbRef.current(), delay, options),
    [delay]
  );
}
