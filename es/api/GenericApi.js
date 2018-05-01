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
    debug('Fetching "%s" resources...', this._resourceName);

    const { data: resources } = await this._httpClient.request({
      method: 'get',
      url: `/${this._resourceName}`,
    });

    debug(resources);
    return resources;
  }

  /**
   * @param {Object} resource
   * @return {Promise}
   */
  async create({ resource }) {
    debug('Creating new "%s" resource...', this._resourceName);

    const { data } = await this._httpClient.request({
      method: 'post',
      url: `/${this._resourceName}`,
      data: resource,
    });

    debug(data);
    return data;
  }

  /**
   * @param {string} id
   * @return {Promise}
   */
  async get({ id }) {
    debug('Fetching "%s" resource id="%s"...', this._resourceName, id);

    const { data: resource } = await this._httpClient.request({
      method: 'get',
      url: `/${this._resourceName}/${id}`,
    });

    debug(resource);
    return resource;
  }


  /**
   * @param {string} id
   * @return {Promise}
   */
  async delete({ id }) {
    debug('Deleting "%s" resource id="%s"...', this._resourceName, id);

    const { data } = await this._httpClient.request({
      method: 'delete',
      url: `/${this._resourceName}/${id}`,
    });

    debug(data);
    return data;
  }

  /**
   * @param {string} id
   * @param {Object} resource
   * @return {Promise}
   */
  async update({ id, resource }) {
    debug('Updating "%s" resource id="%s"...', this._resourceName, id);

    const { data } = await this._httpClient.request({
      method: 'put',
      url: `/${this._resourceName}/${id}`,
      data: resource,
    });

    debug(data);
    return data;
  }
};
