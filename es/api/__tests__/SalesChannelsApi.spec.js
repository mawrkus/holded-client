const SalesChannelsApi = require('../SalesChannelsApi');

function createApi() {
  const httpClient = {
    request: jest.fn(() => ({ data: [] })),
  };

  const api = new SalesChannelsApi({
    httpClient,
  });

  return {
    httpClient,
    api,
  };
}

describe('SalesChannelsApi', () => {
  it('should be a class with the following methods: list(), create(), get(), delete()', () => {
    expect(SalesChannelsApi).toBeInstanceOf(Function);
    expect(SalesChannelsApi.prototype.list).toBeInstanceOf(Function);
    expect(SalesChannelsApi.prototype.create).toBeInstanceOf(Function);
    expect(SalesChannelsApi.prototype.get).toBeInstanceOf(Function);
    expect(SalesChannelsApi.prototype.delete).toBeInstanceOf(Function);
  });

  describe('#list()', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.list();

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'get',
        url: '/saleschannels',
      });
    });

    it('should return the data fetched from the API', async () => {
      const { httpClient, api } = createApi();

      httpClient.request.mockResolvedValue({ data: ['Online store', 'The streets'] });

      const result = await api.list();

      expect(result).toEqual(['Online store', 'The streets']);
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.list())
          .rejects
          .toThrow(httpError);
      });
    });
  });

  describe('#create({ salesChannel })', () => {
    const salesChannel = {
      name: 'Online store',
    };

    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.create({ salesChannel });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'post',
        url: '/saleschannels',
        data: salesChannel,
      });
    });

    it('should return the response from the API', async () => {
      const { httpClient, api } = createApi();

      httpClient.request.mockResolvedValue({ data: { id: 641 } });

      const result = await api.create({ salesChannel });

      expect(result).toEqual({ id: 641 });
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.create({ salesChannel }))
          .rejects
          .toThrow(httpError);
      });
    });
  });

  describe('#get()', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.get({ id: 641 });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'get',
        url: '/saleschannels/641',
      });
    });

    it('should return the data fetched from the API', async () => {
      const { httpClient, api } = createApi();

      httpClient.request.mockResolvedValue({ data: { id: 641, name: 'Online store' } });

      const result = await api.get({ id: 641 });

      expect(result).toEqual({ id: 641, name: 'Online store' });
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.get({ id: 641 }))
          .rejects
          .toThrow(httpError);
      });
    });
  });

  describe('#delete()', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.delete({ id: 641 });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'delete',
        url: '/saleschannels/641',
      });
    });

    it('should return the response from the API', async () => {
      const { httpClient, api } = createApi();
      const apiResponse = { status: 1, info: 'Deleted ok', id: '641' };

      httpClient.request.mockResolvedValue({ data: apiResponse });

      const result = await api.delete({ id: 641 });

      expect(result).toEqual(apiResponse);
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.delete({ id: 641 }))
          .rejects
          .toThrow(httpError);
      });
    });
  });
});
