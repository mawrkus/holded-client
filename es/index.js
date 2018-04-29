const debug = require('debug')('holded:client');
const HttpClient = require('./HttpClient');
const DocumentsApi = require('./api/DocumentsApi');

/**
 * The client for the Holded invoice API v1.0
 * @see https://developers.holded.com/v1.0
 */
module.exports = class HoldedClient {
  /**
   * @param {string} apiKey
   */
  constructor({ apiKey }) {
    const invoiceApiUrl = 'https://api.holded.com/api/invoicing/v1';

    this._httpClient = new HttpClient({
      baseURL: invoiceApiUrl,
      headers: {
        key: apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    this.documents = new DocumentsApi({ httpClient: this._httpClient });

    debug('Holded API client created');
  }
};
