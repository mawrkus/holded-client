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
    this._resourceName = 'documents';
    this._httpClient = httpClient;
    debug('Holded "documents" API created', this.types);
  }

  /**
   * @return {string}
   */
  get resourceName() {
    return this._resourceName;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * @return {Object} All the available document types
   */
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

  /**
   * @param  {Object} value
   * @throws
   */
  set types(value) {
    throw new Error('Modifying document types is not permitted!');
  }
  /* eslint-enable class-methods-use-this */

  /**
   * @param  {string} type The type of documents to retrieve
   * @throws
   * @return {Promise}
   */
  async list({ type }) {
    this._checkForValidType(type);

    const { data: invoicesList } = await this._httpClient.request({
      method: 'get',
      url: `/documents/${type}`,
    });

    return invoicesList;
  }

  /**
   * @param  {string} type The type of document to create
   * @return {Promise}
   */
  async create({ type, document }) {
    this._checkForValidType(type);

    const { data: newDocument } = await this._httpClient.request({
      method: 'post',
      url: `/documents/${type}`,
      data: document,
    });

    return newDocument;
  }

  /**
   * @param  {string} type The type of document to delete
   * @param  {string} id
   * @return {Promise}
   */
  async delete({ type, id }) {
    this._checkForValidType(type);

    const { data: document } = await this._httpClient.request({
      method: 'delete',
      url: `/documents/${type}/${id}`,
    });

    return document;
  }

  /**
   * @param  {string} type The type of document to download
   * @param  {string} id
   * @return {Promise}
   */
  async downloadPdf({ type, id }) {
    this._checkForValidType(type);

    const { data: base64Pdf } = await this._httpClient.request({
      method: 'get',
      url: `/documents/${type}/${id}/pdf`,
    });

    return base64Pdf;
  }

  /**
   * @param  {string} type
   * @throws
   */
  _checkForValidType(type) {
    const allowedTypes = Object.values(this.types);

    if (!allowedTypes.includes(type)) {
      throw new Error(`Unknown document type "${type}"! Please provide one of the following type: ${allowedTypes.join(', ')}.`);
    }
  }
};
