const ContactsApi = require('../ContactsApi');

function createApi() {
  const httpClient = {
    request: jest.fn(() => ({ data: [] })),
  };

  const api = new ContactsApi({
    httpClient,
  });

  return {
    httpClient,
    api,
  };
}

describe('ContactsApi', () => {
  it('should be a class with the following methods: list(), create(), get(), delete()', () => {
    expect(ContactsApi).toBeInstanceOf(Function);
    expect(ContactsApi.prototype.list).toBeInstanceOf(Function);
    expect(ContactsApi.prototype.create).toBeInstanceOf(Function);
    expect(ContactsApi.prototype.get).toBeInstanceOf(Function);
    expect(ContactsApi.prototype.delete).toBeInstanceOf(Function);
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

  describe('#create({ contact })', () => {
    const contact = {
      name: 'Mariano R.',
    };

    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.create({ contact });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'post',
        url: '/contacts',
        data: contact,
      });
    });

    it('should return the data fetched from the API', async () => {
      const { httpClient, api } = createApi();

      httpClient.request.mockResolvedValue({ data: { id: 123 } });

      const result = await api.create({ contact });

      expect(result).toEqual({ id: 123 });
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.create({ contact }))
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
});
