const axios = require('axios');
const debug = require('debug')('holded:http');

function logRequest({ config, includeData = true, includeHeaders = false }) {
  const { method, baseURL, url, headers, data } = config;

  debug('%s %s%s...', method.toUpperCase(), baseURL, url);

  if (includeData) {
    debug(data);
  }

  if (includeHeaders) {
    debug(headers);
  }
}

function logResponse({ response, includeData = true, includeHeaders = false }) {
  const { config, status, statusText, data, headers } = response;
  const { method, url } = config;

  debug('%s %s: %s (%d)', method.toUpperCase(), url, statusText, status);

  if (includeData) {
    debug(data);
  }

  if (includeHeaders) {
    debug(headers);
  }
}

module.exports = class HttpClient {
  /**
   * @param {Object} httpOptions
   */
  constructor(httpOptions) {
    const httpClient = axios.create(httpOptions);

    httpClient.interceptors.request.use((config) => {
      logRequest({ config, includeHeaders: true });
      return config;
    }, async (error) => {
      debug('HTTP request error');
      debug(error);
      throw error;
    });

    httpClient.interceptors.response.use((response) => {
      logResponse({ response });
      return response;
    }, async (error) => {
      const { response } = error;
      logResponse({ response });
      throw error;
    });

    debug('HTTP client created', httpClient.defaults);

    return httpClient;
  }
};
