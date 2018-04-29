const HoldedClient = require('..');
const {
  DocumentsApi,
  ContactsApi,
  SalesChannelsApi,
} = require('../api');

describe('HoldedClient', () => {
  it('should be a class', () => {
    expect(HoldedClient).toBeInstanceOf(Function);
    expect(HoldedClient.prototype).toBeInstanceOf(Object);
  });

  describe('when instantiated', () => {
    it('should expose a documents API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });
      expect(client.documents).toBeInstanceOf(DocumentsApi);
    });

    it('should expose a contacts API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });
      expect(client.contacts).toBeInstanceOf(ContactsApi);
    });

    it('should expose a sales channels API', () => {
      const client = new HoldedClient({ apiKey: 'keykey' });
      expect(client.salesChannels).toBeInstanceOf(SalesChannelsApi);
    });
  });
});
