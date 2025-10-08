import { useEffect, useState } from 'react';
import { api } from '../services/api';

// PUBLIC_INTERFACE
export function useApi(getterFn, deps = []) {
  /**
   * Simple hook to handle API calls with loading and error states.
   */
  const [state, setState] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    let mounted = true;
    setState(s => ({ ...s, loading: true, error: null }));
    getterFn()
      .then(res => mounted && setState({ loading: false, data: res.data, error: null }))
      .catch(err => mounted && setState({ loading: false, data: null, error: err }));
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

// PUBLIC_INTERFACE
export function useHealth() {
  /** Check backend health endpoint /health/ */
  return useApi(api.health, []);
}
