const HoldedClient = require('..');
const DocumentsApi = require('../api/DocumentsApi');
const ContactsApi = require('../api/ContactsApi');

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
  });
});
