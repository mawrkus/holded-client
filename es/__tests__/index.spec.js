const HoldedClient = require('..');
const DocumentsApi = require('../api/DocumentsApi');

describe('HoldedClient', () => {
  it('should be a class', () => {
    expect(HoldedClient).toBeInstanceOf(Function);
    expect(HoldedClient.prototype).toBeInstanceOf(Object);
  });

  describe('when instantiated', () => {
    it('should expose a documents API', () => {
      const client = new HoldedClient({
        apiKey: 'keykey',
      });

      expect(client.documents).toBeInstanceOf(DocumentsApi);
    });
  });
});
