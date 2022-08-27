import fetchJson from './fetch-json';

const api = {
  get: (path: string) => {
    return fetchJson(path);
  },
};

export default api;
