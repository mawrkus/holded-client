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

    this._decorateInvalidTypeMethods(['list', 'create', 'delete', 'update', 'downloadPdf']);

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
    debug('Fetching "%s" documents...', type);

    const { data: documents } = await this._httpClient.request({
      method: 'get',
      url: `/documents/${type}`,
    });

    debug(documents);
    return documents;
  }

  /**
   * @param  {string} type The type of document to create
   * @param  {Object} document
   * @return {Promise}
   */
  async create({ type, document }) {
    debug('Creating new "%s" document...', type);

    const { data } = await this._httpClient.request({
      method: 'post',
      url: `/documents/${type}`,
      data: document,
    });

    debug(data);
    return data;
  }

  /**
   * @param  {string} type The type of document to delete
   * @param  {string} id
   * @return {Promise}
   */
  async delete({ type, id }) {
    debug('Deleting "%s" document id="%s"...', type, id);

    const { data } = await this._httpClient.request({
      method: 'delete',
      url: `/documents/${type}/${id}`,
    });

    debug(data);
    return data;
  }

  /**
   * @param  {string} type The type of document to update
   * @param  {string} id
   * @param  {Object} document
   * @return {Promise}
   */
  async update({ type, id, document }) {
    debug('Updating "%s" document id="%s"...', type, id);

    const { data } = await this._httpClient.request({
      method: 'put',
      url: `/documents/${type}/${id}`,
      data: document,
    });

    debug(data);
    return data;
  }

  /**
   * @param  {string} type The type of document to download
   * @param  {string} id
   * @return {Promise}
   */
  async downloadPdf({ type, id }) {
    debug('Downloading "%s" document id="%s" to PDF...', type, id);

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
  _throwIfInvalidType(type) {
    const allowedTypes = Object.values(this.types);

    if (!allowedTypes.includes(type)) {
      throw new Error(`Unknown document type "${type}"! Please provide one of the following type: ${allowedTypes.join(', ')}.`);
    }
  }

  /**
   * @param {string[]} methodNames
   */
  _decorateInvalidTypeMethods(methodNames) {
    methodNames.forEach((methodName) => {
      const originalMethod = this[methodName].bind(this);

      this[methodName] = async (params) => {
        const { type } = params;
        this._throwIfInvalidType(type);
        return originalMethod(params);
      };
    });
  }
};
