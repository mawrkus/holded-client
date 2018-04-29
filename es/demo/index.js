const dotEnv = require('dotenv');
const debug = require('debug')('holded:demo');
const HoldedClient = require('..');

const env = dotEnv.config({ path: '.env-dev' });
const { HOLDED_API_KEY: apiKey } = env.parsed;

const client = new HoldedClient({ apiKey });

const { types } = client.documents;

(async () => {
  debug('Fetching invoices...');
  const invoicesList = await client.documents.listByType({ type: types.INVOICE });
  debug(invoicesList);
})();
