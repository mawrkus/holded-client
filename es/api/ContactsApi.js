const debug = require('debug')('holded:client:contacts');

/**
 * The Holded invoice documents API
 * @see https://developers.holded.com/v1.0/reference#contacts
 */
module.exports = class DocumentsApi {
  /**
   * @param {HttpClient} An HTTP client for the Holded API
   */
  constructor({ httpClient }) {
    this._httpClient = httpClient;
    debug('Holded contacts API created');
  }

  /**
   * @return {Promise}
   */
  async list() {
    const { data: contactsList } = await this._httpClient.request({
      method: 'get',
      url: '/contacts',
    });

    return contactsList;
  }

  /**
   * @param {Object} contact
   * @return {Promise}
   */
  async create({ contact }) {
    const { data: newContact } = await this._httpClient.request({
      method: 'post',
      url: '/contacts',
      data: contact,
    });

    return newContact;
  }

  /**
   * Beware that if the contact has not been found, the API does return a 400 (Bad Request) with
   * the following data: { status: 0, info: 'not found' }
   * @return {Promise}
   */
  async get({ id }) {
    const { data: contact } = await this._httpClient.request({
      method: 'get',
      url: `/contacts/${id}`,
    });

    return contact;
  }


  /**
   * Beware that if the contact has not been found, the API does return a 400 (Bad Request) with
   * the following data: { status: 0, info: 'not found' }
   * @return {Promise}
   */
  async delete({ id }) {
    const { data: contact } = await this._httpClient.request({
      method: 'delete',
      url: `/contacts/${id}`,
    });

    return contact;
  }
};
