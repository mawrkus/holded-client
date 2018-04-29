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
  it('should be a class with the following methods: listByType()', () => {
    expect(DocumentsApi).toBeInstanceOf(Function);
    expect(DocumentsApi.prototype.listByType).toBeInstanceOf(Function);
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

  describe('#listByType({ type })', () => {
    it('should make a proper HTTP request to Holded API', async () => {
      const { httpClient, api } = createApi();

      await api.listByType({ type: 'salesreceipt' });

      expect(httpClient.request).toHaveBeenCalledWith({
        url: '/documents/salesreceipt',
      });
    });

    it('should return the data fetched from the API', async () => {
      const { httpClient, api } = createApi();

      httpClient.request.mockResolvedValue({ data: ['receipt a', 'receipt b'] });

      const result = await api.listByType({ type: 'salesreceipt' });

      expect(result).toEqual(['receipt a', 'receipt b']);
    });

    describe('when providing an unknown document type', () => {
      it('should throw an error', async () => {
        const { api } = createApi();

        await expect(api.listByType({ type: 'dni' }))
          .rejects
          .toThrow(/Unknown document type "dni"!/);
      });
    });
  });
});
