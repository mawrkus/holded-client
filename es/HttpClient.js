const axios = require('axios');
const debug = require('debug')('holded:http');

function logRequest(config) {
  const { method, baseURL, url, headers, data } = config;
  debug('%s %s%s...', method.toUpperCase(), baseURL, url, data);
  debug(headers);
}

function logResponse(response) {
  const { config, status, statusText, data } = response;
  const { method, url } = config;
  debug('%s %s: %s (%d)', method.toUpperCase(), url, statusText, status, data);
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
      logResponse(response);
      throw error;
    });

    debug('HTTP client created', httpClient.defaults);

    return httpClient;
  }
};
