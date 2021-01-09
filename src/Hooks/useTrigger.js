import { useEffect } from 'react';
import usePrevious from './usePrevious';

export default function useTrigger(callback, dependencies) {
  const prev = usePrevious(dependencies);
  useEffect(() => {
    if (JSON.stringify(prev) !== JSON.stringify(dependencies)) {
      callback();
    }
  }, [dependencies, callback, prev]);
}
