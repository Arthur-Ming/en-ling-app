import fetchJson from './fetch-json';
const api = {
  get: (path: string) => {
    return fetchJson(path);
  },
  post: async <T>(path: string, body: T) => {
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return data;
  },
};

export default api;
