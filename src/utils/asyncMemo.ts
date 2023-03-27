import React from 'react';

export function useAsyncMemo<T>(
  effect: (...args: []) => Promise<T> | T,
  deps?: React.DependencyList,
) {
  const [value, setValue] = React.useState<T>();
  React.useEffect((...args) => {
    Promise.resolve(effect(...args)).then((res) => setValue(res));
  }, deps);
  return value;
}
