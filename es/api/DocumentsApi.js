const debug = require('debug')('holded:client:documents');

/**
 * The Holded invoice documents API
 * @see https://developers.holded.com/v1.0/reference#documents
 */
module.exports = class DocumentsApi {
  /**
   * @param {HttpClient} An HTTP client for the Holded API
   */
  constructor({ httpClient }) {
    this._httpClient = httpClient;
    debug('Holded documents API created', this.types);
  }

  /* eslint-disable class-methods-use-this */
  get types() {
    return {
      CREDITNOTE: 'creditnote',
      ESTIMATE: 'estimate',
      INVOICE: 'invoice',
      PROFORM: 'proform',
      PURCHASE: 'purchase',
      PURCHASEREFUND: 'purchaserefund',
      SALESORDER: 'salesorder',
      SALESRECEIPT: 'salesreceipt',
    };
  }

  set types(value) {
    throw new Error('Modifying document types is not permitted!');
  }
  /* eslint-enable class-methods-use-this */

  /**
   * @param  {type} type The type of document to retrieve
   * @throws
   * @return {Promise}
   */
  async listByType({ type }) {
    const allowedTypes = Object.values(this.types);

    if (!allowedTypes.includes(type)) {
      throw new Error(`Unknown document type "${type}"! Please provide one of the following type: ${allowedTypes.join(', ')}.`);
    }

    const { data: invoicesList } = await this._httpClient.request({
      url: `/documents/${type}`,
    });

    return invoicesList;
  }
};
