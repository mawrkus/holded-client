const debug = require('debug')('holded:client:core');
const { version: pkgVersion } = require('../package.json');
const HttpClient = require('./HttpClient');
const {
  DocumentsApi,
  GenericApi,
} = require('./api');

/**
 * The client for the Holded invoice API v1.0
 * @see https://developers.holded.com/v1.0
 */
module.exports = class HoldedClient {
  /**
   * @param {string} apiKey
   */
  constructor({ apiKey }) {
    debug('💎  Holded API client v%s', pkgVersion);

    const invoiceApiUrl = 'https://api.holded.com/api/invoicing/v1';

    this._httpClient = new HttpClient({
      baseURL: invoiceApiUrl,
      headers: {
        key: apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    [
      'contacts',
      'saleschannels',
      'products',
      'warehouses',
      'treasury',
      'expensesaccounts',
      'payments',
    ].forEach((resourceName) => {
      const api = new GenericApi({
        resourceName,
        httpClient: this._httpClient,
      });

      this._decorateNotFoundMethods({ api, methodNames: ['get', 'delete', 'update'] });

      this[resourceName] = api;
    });

    const api = new DocumentsApi({ httpClient: this._httpClient });
    this._decorateNotFoundMethods({ api, methodNames: ['downloadPdf', 'delete', 'update'] });
    this.documents = api;

    debug('Holded API client created');
  }

  /**
   * We do this because if the resource is not found, the API does not return a 404 but a
   * 400 (Bad Request) with (e.g.) the following data: { status: 0, info: 'not found' }
   * @param {Api} api
   * @param {string[]} methodNames
   */
  _decorateNotFoundMethods({ api, methodNames }) {
    methodNames.forEach((methodName) => {
      const originalMethod = api[methodName].bind(api);

      // eslint-disable-next-line no-param-reassign
      api[methodName] = async (params) => {
        try {
          return await originalMethod(params);
        } catch (error) {
          this._throwIfNotFoundError({
            error,
            resourceId: params.id,
            resourceName: api.resourceName,
          });

          throw error;
        }
      };
    });
  }

  /**
   * @param  {Error} error
   * @param  {string} resourceId
   * @param  {string} resourceName
   * @throws
   */
  // eslint-disable-next-line class-methods-use-this
  _throwIfNotFoundError({ error, resourceId, resourceName }) {
    const { response = {} } = error;
    const { status, data = {} } = response;
    const isNotFound = status === 400 &&
                        data.status === 0 &&
                        Boolean(data.info.match(/.*not found/i));

    if (isNotFound) {
      const notFoundError = new Error(`"${resourceName}" resource id="${resourceId}" not found!`);
      notFoundError.response = {
        status: 404,
        statusText: 'Not Found',
      };
      notFoundError.originalError = error;
      throw notFoundError;
    }
  }
};
