function client(endpoint, { body, ...customConfig } = {}) {
  const code = window.localStorage.getItem('code');
  const headers = { 'Content-Type': 'application/json' };
  if (code) {
    headers.Authorization = `Bearer ${code}`;
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return window
    .fetch(`/api/${endpoint}`, config)
    .then((r) => r.json());
}

export default client;
