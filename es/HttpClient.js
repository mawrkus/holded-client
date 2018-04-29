const axios = require('axios');
const debug = require('debug')('holded:http');

function logRequest(config) {
  const { method, baseURL, url, params = '', headers } = config;
  debug('%s%s %s...', method.toUpperCase(), baseURL, url, params);
  debug(headers);
}

function logResponse(response) {
  const { config, status, statusText } = response;
  const { method, url, params = '' } = config;
  debug('%s %s: %s (%d)', method.toUpperCase(), url, statusText, status, params);
}

module.exports = class HttpClient {
  /**
   * @param {Object} httpOptions
   */
  constructor(httpOptions) {
    const httpClient = axios.create(httpOptions);

    httpClient.interceptors.request.use((config) => {
      logRequest(config);
      return config;
    }, async (error) => {
      debug('HTTP request error');
      debug(error);
      throw error;
    });

    httpClient.interceptors.response.use((response) => {
      logResponse(response);
      return response;
    }, async (error) => {
      const { response } = error;
      const { config, status, statusText } = response;
      const { method, url, params } = config;
      debug('%s %s: %s (%d)', method.toUpperCase(), url, statusText, status, params);
      throw error;
    });

    debug('HTTP client created', httpClient.defaults);

    return httpClient;
  }
};
