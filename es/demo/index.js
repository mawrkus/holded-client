const fs = require('fs');
const dotEnv = require('dotenv');
const debug = require('debug')('holded:client:demo');
const HoldedClient = require('..');

const env = dotEnv.config({ path: '.env-dev' });
const { HOLDED_API_KEY: apiKey } = env.parsed;

const client = new HoldedClient({ apiKey });
const { types: docTypes } = client.documents;

/* eslint no-unused-vars: warn */

async function createInvoice() {
  debug('Creating new invoice...');
  const document = {
    salesChannelId: '5ae61a9b2e1d933c6806be13',
    contactCode: 42,
    contactName: 'Antoine',
    date: Date.now() / 1000, // PHP on the backend baby
    notes: 'Premium account',
    language: 'en',
    items: [{
      name: '6h chillax coworking Gerona',
      desc: 'Meeting room reservation',
      units: 1,
      subtotal: 300,
      tax: 20, // %
      sku: 'co-gerona-bcn',
    }],
  };
  const invoice = await client.documents.create({ type: docTypes.INVOICE, document });
  debug(invoice);
}

async function listInvoices() {
  debug('Fetching invoices list...');
  const invoicesList = await client.documents.list({ type: docTypes.INVOICE });
  debug(invoicesList);
}

async function downloadInvoice(id) {
  debug('Downloading invoice "%s"...', id);
  const { data: base64Pdf } = await client.documents.downloadPdf({ type: docTypes.INVOICE, id });
  const pdfFile = './es/demo/out/invoice.pdf';

  try {
    fs.unlinkSync(pdfFile);
  } catch (e) {
    // nothing to do
  }

  fs.writeFileSync(pdfFile, base64Pdf, { encoding: 'base64' });
  debug('Invoice PDF file saved to "%s".', pdfFile);
}

async function deleteInvoice(id) {
  debug('Deleting invoice "%s"...', id);
  const invoice = await client.documents.delete({ type: docTypes.INVOICE, id });
  debug(invoice);
}

async function createItem({ what, params }) {
  debug('Creating new %s...', what);
  const newContact = await client[what].create(params);
  debug(newContact);
}

async function listItems({ what }) {
  debug('Fetching %s list...', what);
  const list = await client[what].list();
  debug(list);
}

async function getItem({ what, id }) {
  debug('Fetching %s "%s"...', what, id);
  const item = await client[what].get({ id });
  debug(item);
}

async function deleteItem({ what, id }) {
  debug('Deleting %s "%s"...', what, id);
  const response = await client[what].delete({ id });
  debug(response);
}

(async () => {
  try {
    // const params = { contact: { code: 78, name: 'Mariano' } };
    // await createItem({ what: 'contacts', params });
    await listItems({ what: 'contacts' });
    // await getItem({ what: 'contacts', id: 'abc' });
    // await deleteItem({ what: 'contacts', id: 'abc' });
    // await listItems({ what: 'contacts' });

    // const params = { salesChannel: { name: 'Online', desc: 'Our worldwide online store' } };
    // await createItem({ what: 'salesChannels', params });
    await listItems({ what: 'salesChannels' });
    // await getItem({ what: 'salesChannels', id: 'cde' });
    // await deleteItem({ what: 'salesChannels', id: 'cde' });
    // await listItems({ what: 'salesChannels' });

    // await createInvoice();
    await listInvoices();
    // await downloadInvoice('efg');
    // await deleteInvoice('efg');
    // await listInvoices();
  } catch (demoError) {
    debug(demoError);
  }
})();
