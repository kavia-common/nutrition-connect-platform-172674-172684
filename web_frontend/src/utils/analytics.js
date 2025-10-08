const enabled = true;

// PUBLIC_INTERFACE
export function track(eventName, payload = {}) {
  if (!enabled) return;
  try {
    // placeholder for real analytics integration
    // eslint-disable-next-line no-console
    console.log('[analytics]', eventName, payload);
  } catch (e) {
    // ignore
  }
}
