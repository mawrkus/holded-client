const GenericApi = require('../GenericApi');

function createApi() {
  const httpClient = {
    request: jest.fn(() => ({ data: [] })),
  };

  const api = new GenericApi({
    resourceName: 'contacts',
    httpClient,
  });

  return {
    httpClient,
    api,
  };
}

describe('GenericApi', () => {
  it('should be a class with the following methods: list(), create(), get(), delete(), update()', () => {
    expect(GenericApi).toBeInstanceOf(Function);
    expect(GenericApi.prototype.list).toBeInstanceOf(Function);
    expect(GenericApi.prototype.create).toBeInstanceOf(Function);
    expect(GenericApi.prototype.get).toBeInstanceOf(Function);
    expect(GenericApi.prototype.delete).toBeInstanceOf(Function);
    expect(GenericApi.prototype.update).toBeInstanceOf(Function);
  });

  describe('#list()', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.list();

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'get',
        url: '/contacts',
      });
    });

    it('should return the data fetched from the API', async () => {
      const { httpClient, api } = createApi();

      httpClient.request.mockResolvedValue({ data: ['Mariano', 'Soraya'] });

      const result = await api.list();

      expect(result).toEqual(['Mariano', 'Soraya']);
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

  describe('#create({ resource })', () => {
    const resource = {
      name: 'Mariano R.',
    };

    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.create({ resource });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'post',
        url: '/contacts',
        data: resource,
      });
    });

    it('should return the response from the API', async () => {
      const { httpClient, api } = createApi();
      const apiResponse = { status: 201, info: 'Created', id: '55' };

      httpClient.request.mockResolvedValue({ data: apiResponse });

      const result = await api.create({ resource });

      expect(result).toEqual(apiResponse);
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.create({ resource }))
          .rejects
          .toThrow(httpError);
      });
    });
  });

  describe('#get()', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.get({ id: 71 });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'get',
        url: '/contacts/71',
      });
    });

    it('should return the data fetched from the API', async () => {
      const { httpClient, api } = createApi();

      httpClient.request.mockResolvedValue({ data: { id: 71, name: 'Soraya' } });

      const result = await api.get({ id: 71 });

      expect(result).toEqual({ id: 71, name: 'Soraya' });
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.get({ id: 71 }))
          .rejects
          .toThrow(httpError);
      });
    });
  });

  describe('#delete()', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.delete({ id: 71 });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'delete',
        url: '/contacts/71',
      });
    });

    it('should return the response from the API', async () => {
      const { httpClient, api } = createApi();
      const apiResponse = { status: 1, info: 'Deleted ok', id: '71' };

      httpClient.request.mockResolvedValue({ data: apiResponse });

      const result = await api.delete({ id: 71 });

      expect(result).toEqual(apiResponse);
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.delete({ id: 71 }))
          .rejects
          .toThrow(httpError);
      });
    });
  });

  describe('#update({ resource })', () => {
    const resource = {
      id: 55,
      email: 'mariano@joy.org',
    };

    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.update({ resource });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'put',
        url: '/contacts/55',
        data: resource,
      });
    });

    it('should return the response from the API', async () => {
      const { httpClient, api } = createApi();
      const apiResponse = { status: 1, info: 'Updated', id: '55' };

      httpClient.request.mockResolvedValue({ data: apiResponse });

      const result = await api.update({ resource });

      expect(result).toEqual(apiResponse);
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.update({ resource }))
          .rejects
          .toThrow(httpError);
      });
    });
  });
});
