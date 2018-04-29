const debug = require('debug')('holded:client:saleschannels');

/**
 * The Holded invoice sales channels API
 * @see https://developers.holded.com/v1.0/reference#sales-channels
 */
module.exports = class SalesChannelsApi {
  /**
   * @param {HttpClient} An HTTP client for the Holded API
   */
  constructor({ httpClient }) {
    this._httpClient = httpClient;
    debug('Holded sales channels API created');
  }

  /**
   * @return {Promise}
   */
  async list() {
    const { data: salesChannelsList } = await this._httpClient.request({
      method: 'get',
      url: '/saleschannels',
    });

    return salesChannelsList;
  }

  /**
   * @param {Object} salesChannel
   * @return {Promise}
   */
  async create({ salesChannel }) {
    const { data: newSalesChannel } = await this._httpClient.request({
      method: 'post',
      url: '/saleschannels',
      data: salesChannel,
    });

    return newSalesChannel;
  }

  /**
   * Beware that if the salesChannel has not been found, the API does return a 400 (Bad Request)
   * with the following data: { status: 0, info: 'not found' }
   * @param {string} id
   * @return {Promise}
   */
  async get({ id }) {
    const { data: salesChannel } = await this._httpClient.request({
      method: 'get',
      url: `/saleschannels/${id}`,
    });

    return salesChannel;
  }


  /**
   * Beware that if the salesChannel has not been found, the API does return a 400 (Bad Request)
   * with the following data: { status: 0, info: 'not found' }
   * @param {string} id
   * @return {Promise}
   */
  async delete({ id }) {
    const { data: salesChannel } = await this._httpClient.request({
      method: 'delete',
      url: `/saleschannels/${id}`,
    });

    return salesChannel;
  }
};
