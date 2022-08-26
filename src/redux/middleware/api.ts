import { Middleware } from 'redux';
import { REQUEST, SUCCESS, FAILURE, LOAD_WORDS } from '../constants';

const api: Middleware<Record<string, unknown>> = () => (next) => async (action) => {
  if (!action.CallAPI) return next(action);

  const { type, ...rest } = action;

  switch (type) {
    case LOAD_WORDS: {
      next({ ...rest, type: type + REQUEST });
      try {
        const res = await fetch(action.CallAPI);
        const data = await res.json();

        if (!res.ok) throw data;

        return next({ ...rest, type: type + SUCCESS, data });
      } catch (error) {
        throw next({ ...rest, type: type + FAILURE, error });
      }
    }

    default:
      return next(action);
  }
};

export default api;
