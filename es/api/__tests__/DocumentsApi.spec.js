const DocumentsApi = require('../DocumentsApi');

function createApi() {
  const httpClient = {
    request: jest.fn(() => ({ data: [] })),
  };

  const api = new DocumentsApi({
    httpClient,
  });

  return {
    httpClient,
    api,
  };
}

describe('DocumentsApi', () => {
  it('should be a class with the following methods: list(), create(), delete(), update(), downloadPdf()', () => {
    expect(DocumentsApi).toBeInstanceOf(Function);
    expect(DocumentsApi.prototype.list).toBeInstanceOf(Function);
    expect(DocumentsApi.prototype.create).toBeInstanceOf(Function);
    expect(DocumentsApi.prototype.delete).toBeInstanceOf(Function);
    expect(DocumentsApi.prototype.update).toBeInstanceOf(Function);
    expect(DocumentsApi.prototype.downloadPdf).toBeInstanceOf(Function);
  });

  it('should expose the document types as an object', () => {
    const { api } = createApi();

    expect(api.types).toEqual({
      CREDITNOTE: 'creditnote',
      ESTIMATE: 'estimate',
      INVOICE: 'invoice',
      PROFORM: 'proform',
      PURCHASE: 'purchase',
      PURCHASEREFUND: 'purchaserefund',
      SALESORDER: 'salesorder',
      SALESRECEIPT: 'salesreceipt',
    });
  });

  it('should not allow changing the document types', () => {
    const { api } = createApi();

    expect(() => { api.types = 'hell yeah!'; })
      .toThrowError('Modifying document types is not permitted!');
  });

  describe('#list({ type })', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.list({ type: api.types.SALESRECEIPT });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'get',
        url: `/documents/${api.types.SALESRECEIPT}`,
      });
    });

    it('should return the data fetched from the API', async () => {
      const { httpClient, api } = createApi();

      httpClient.request.mockResolvedValue({ data: ['receipt a', 'receipt b'] });

      const result = await api.list({ type: api.types.SALESRECEIPT });

      expect(result).toEqual(['receipt a', 'receipt b']);
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.list({ type: api.types.SALESRECEIPT }))
          .rejects
          .toThrow(httpError);
      });
    });

    describe('when providing an unknown document type', () => {
      it('should throw an error', async () => {
        const { api } = createApi();

        await expect(api.list({ type: 'dni' }))
          .rejects
          .toThrow(/Unknown document type "dni"!/);
      });
    });
  });

  describe('#create({ type, document })', () => {
    const document = {
      desc: 'receipt',
      items: [{
        name: 'bear',
        units: 3,
        subotal: 24.6,
      }],
    };

    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.create({ type: api.types.SALESRECEIPT, document });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'post',
        url: `/documents/${api.types.SALESRECEIPT}`,
        data: document,
      });
    });

    it('should return the response from the API', async () => {
      const { httpClient, api } = createApi();

      httpClient.request.mockResolvedValue({ data: { id: 123 } });

      const result = await api.create({ type: api.types.SALESRECEIPT, document });

      expect(result).toEqual({ id: 123 });
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.create({ type: api.types.SALESRECEIPT, document }))
          .rejects
          .toThrow(httpError);
      });
    });

    describe('when providing an unknown document type', () => {
      it('should throw an error', async () => {
        const { api } = createApi();

        await expect(api.create({ type: 'birthcertificate', document }))
          .rejects
          .toThrow(/Unknown document type "birthcertificate"!/);
      });
    });
  });

  describe('#delete({ type, id })', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.delete({ type: api.types.SALESRECEIPT, id: 88 });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'delete',
        url: `/documents/${api.types.SALESRECEIPT}/88`,
      });
    });

    it('should return the response from the API', async () => {
      const { httpClient, api } = createApi();
      const apiResponse = { status: 1, info: 'Deleted ok', id: '88' };

      httpClient.request.mockResolvedValue({ data: apiResponse });

      const result = await api.delete({ type: api.types.SALESRECEIPT, id: 88 });

      expect(result).toEqual(apiResponse);
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.delete({ type: api.types.SALESRECEIPT, id: 88 }))
          .rejects
          .toThrow(httpError);
      });
    });

    describe('when providing an unknown document type', () => {
      it('should throw an error', async () => {
        const { api } = createApi();

        await expect(api.downloadPdf({ type: 'master', id: 88 }))
          .rejects
          .toThrow(/Unknown document type "master"!/);
      });
    });
  });

  describe('#update({ type, id, document })', () => {
    const id = 88;
    const document = {
      desc: 'paper receipt',
    };

    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.update({ type: api.types.SALESRECEIPT, id, document });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'put',
        url: `/documents/${api.types.SALESRECEIPT}/88`,
        data: document,
      });
    });

    it('should return the response from the API', async () => {
      const { httpClient, api } = createApi();
      const apiResponse = { status: 1, info: 'Deleted ok', id: '88' };

      httpClient.request.mockResolvedValue({ data: apiResponse });

      const result = await api.update({ type: api.types.SALESRECEIPT, id, document });

      expect(result).toEqual(apiResponse);
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.update({ type: api.types.SALESRECEIPT, id, document }))
          .rejects
          .toThrow(httpError);
      });
    });

    describe('when providing an unknown document type', () => {
      it('should throw an error', async () => {
        const { api } = createApi();

        await expect(api.downloadPdf({ type: 'master', id: 88 }))
          .rejects
          .toThrow(/Unknown document type "master"!/);
      });
    });
  });

  describe('#downloadPdf({ type, id })', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.downloadPdf({ type: api.types.SALESRECEIPT, id: 88 });

      expect(httpClient.request).toHaveBeenCalledWith({
        method: 'get',
        url: `/documents/${api.types.SALESRECEIPT}/88/pdf`,
      });
    });

    it('should return the data fetched from the API', async () => {
      const { httpClient, api } = createApi();
      const base64Response = Buffer.from('qazwsxedc').toString('base64');

      httpClient.request.mockResolvedValue({ data: base64Response });

      const result = await api.downloadPdf({ type: api.types.SALESRECEIPT, id: 88 });

      expect(result).toEqual(base64Response);
    });

    describe('when there is an error requesting the API', () => {
      it('should forward (throw) the error', async () => {
        const { httpClient, api } = createApi();
        const httpError = new Error('HTTP error!');

        httpClient.request.mockRejectedValue(httpError);

        await expect(api.downloadPdf({ type: api.types.SALESRECEIPT, id: 88 }))
          .rejects
          .toThrow(httpError);
      });
    });

    describe('when providing an unknown document type', () => {
      it('should throw an error', async () => {
        const { api } = createApi();

        await expect(api.downloadPdf({ type: 'swimmingcertificate', id: 88 }))
          .rejects
          .toThrow(/Unknown document type "swimmingcertificate"!/);
      });
    });
  });
});
