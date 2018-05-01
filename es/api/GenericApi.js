const debug = require('debug')('holded:client:api');

/**
 * The Holded invoice API
 * @see https://developers.holded.com/v1.0/reference
 */
module.exports = class GenericApi {
  /**
   * @param {string} resourceName
   * @param {HttpClient} An HTTP client for the Holded API
   */
  constructor({ resourceName, httpClient }) {
    this._resourceName = resourceName;
    this._httpClient = httpClient;
    debug('Holded "%s" API created', this._resourceName);
  }

  /**
   * @return {string}
   */
  get resourceName() {
    return this._resourceName;
  }

  /**
   * @return {Promise}
   */
  async list() {
    const { data: list } = await this._httpClient.request({
      method: 'get',
      url: `/${this._resourceName}`,
    });

    return list;
  }

  /**
   * @param {Object} resource
   * @return {Promise}
   */
  async create({ resource }) {
    const { data } = await this._httpClient.request({
      method: 'post',
      url: `/${this._resourceName}`,
      data: resource,
    });

    return data;
  }

  /**
   * Beware that if the resource has not been found, the API does return a 400 (Bad Request)
   * with the following data: { status: 0, info: 'not found' }
   * @param {string} id
   * @return {Promise}
   */
  async get({ id }) {
    const { data } = await this._httpClient.request({
      method: 'get',
      url: `/${this._resourceName}/${id}`,
    });

    return data;
  }


  /**
   * Beware that if the resource has not been found, the API does return a 400 (Bad Request)
   * with the following data: { status: 0, info: 'not found' }
   * @param {string} id
   * @return {Promise}
   */
  async delete({ id }) {
    const { data } = await this._httpClient.request({
      method: 'delete',
      url: `/${this._resourceName}/${id}`,
    });

    return data;
  }

  /**
   * @param {Object} resource
   * @return {Promise}
   */
  async update({ resource }) {
    const { data } = await this._httpClient.request({
      method: 'put',
      url: `/${this._resourceName}/${resource.id}`,
      data: resource,
    });

    return data;
  }
};
