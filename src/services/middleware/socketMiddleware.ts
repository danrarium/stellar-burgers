import { Middleware } from '@reduxjs/toolkit';

type SocketActions = {
  connect: string;
  disconnect: string;
  onOpen: string;
  onClose: string;
  onMessage: string;
  onError: string;
};

export const createSocketMiddleware =
  (actions: SocketActions): Middleware =>
  (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { type, payload } = action as { type: string; payload?: string };

      if (type === actions.connect && payload) {
        if (socket) {
          socket.close();
        }
        socket = new WebSocket(payload);

        socket.onopen = () => {
          store.dispatch({ type: actions.onOpen });
        };

        socket.onclose = () => {
          store.dispatch({ type: actions.onClose });
          socket = null;
        };

        socket.onerror = () => {
          store.dispatch({ type: actions.onError, payload: 'WebSocket error' });
        };

        socket.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            store.dispatch({ type: actions.onMessage, payload: data });
          } catch {
            store.dispatch({
              type: actions.onError,
              payload: 'Failed to parse message'
            });
          }
        };
      }

      if (type === actions.disconnect && socket) {
        socket.close();
        socket = null;
      }

      return next(action);
    };
  };
