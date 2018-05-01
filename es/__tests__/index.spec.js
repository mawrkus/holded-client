const HoldedClient = require('..');
const {
  DocumentsApi,
  GenericApi,
} = require('../api');

describe('HoldedClient', () => {
  it('should be a class', () => {
    expect(HoldedClient).toBeInstanceOf(Function);
    expect(HoldedClient.prototype).toBeInstanceOf(Object);
  });

  describe('when instantiated', () => {
    it('should expose a "documents" API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });

      expect(client.documents).toBeInstanceOf(DocumentsApi);
      expect(client.documents.resourceName).toBe('documents');
    });

    it('should expose a "contacts" API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });

      expect(client.contacts).toBeInstanceOf(GenericApi);
      expect(client.contacts.resourceName).toBe('contacts');
    });

    it('should expose a "saleschannels" API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });

      expect(client.saleschannels).toBeInstanceOf(GenericApi);
      expect(client.saleschannels.resourceName).toBe('saleschannels');
    });

    it('should expose a "products" API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });

      expect(client.products).toBeInstanceOf(GenericApi);
      expect(client.products.resourceName).toBe('products');
    });

    it('should expose a "warehouses" API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });

      expect(client.warehouses).toBeInstanceOf(GenericApi);
      expect(client.warehouses.resourceName).toBe('warehouses');
    });

    it('should expose a "treasury" API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });

      expect(client.treasury).toBeInstanceOf(GenericApi);
      expect(client.treasury.resourceName).toBe('treasury');
    });

    it('should expose a "expensesaccounts" API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });

      expect(client.expensesaccounts).toBeInstanceOf(GenericApi);
      expect(client.expensesaccounts.resourceName).toBe('expensesaccounts');
    });

    it('should expose a "payments" API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });

      expect(client.payments).toBeInstanceOf(GenericApi);
      expect(client.payments.resourceName).toBe('payments');
    });
  });
});
