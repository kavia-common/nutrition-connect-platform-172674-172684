const WS_BASE = (process.env.REACT_APP_WS_BASE_URL || '').replace(/\/$/, '');

// PUBLIC_INTERFACE
export function createSocketClient(path = '/chat') {
  /**
   * Create a simple reconnecting WebSocket client for real-time features (e.g., chat).
   */
  let ws;
  let listeners = { message: [], open: [], close: [], error: [] };
  let shouldReconnect = true;
  const url = `${WS_BASE}${path}`;

  function connect() {
    ws = new WebSocket(url);
    ws.onopen = (ev) => listeners.open.forEach(cb => cb(ev));
    ws.onclose = (ev) => {
      listeners.close.forEach(cb => cb(ev));
      if (shouldReconnect) setTimeout(connect, 1000);
    };
    ws.onerror = (ev) => listeners.error.forEach(cb => cb(ev));
    ws.onmessage = (ev) => listeners.message.forEach(cb => cb(ev.data));
  }

  connect();

  return {
    send: (payload) => {
      const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
      if (ws && ws.readyState === 1) ws.send(data);
    },
    on: (type, cb) => {
      if (!listeners[type]) listeners[type] = [];
      listeners[type].push(cb);
      return () => {
        listeners[type] = listeners[type].filter(f => f !== cb);
      };
    },
    close: () => {
      shouldReconnect = false;
      if (ws) ws.close();
    }
  };
}
