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

async function createResource({ resourceName, resource }) {
  debug('Creating new %s...', resourceName);
  const newResource = await client[resourceName].create({ resource });
  debug(newResource);
}

async function listResources({ resourceName }) {
  debug('Fetching %s list...', resourceName);
  const resourcesList = await client[resourceName].list();
  debug(resourcesList);
}

async function getResource({ resourceName, id }) {
  debug('Fetching %s "%s"...', resourceName, id);
  const resource = await client[resourceName].get({ id });
  debug(resource);
}

async function deleteResource({ resourceName, id }) {
  debug('Deleting %s "%s"...', resourceName, id);
  const response = await client[resourceName].delete({ id });
  debug(response);
}

async function updateResource({ resourceName, resource }) {
  debug('Updating %s "%s"...', resourceName, resource.id);
  const response = await client[resourceName].update({ resource });
  debug(response);
}

(async () => {
  try {
    /* const resource = { code: 78, name: 'Mariano' };
    await createResource({ resourceName: 'contacts', resource });
    await listResources({ resourceName: 'contacts' }); */
    /* await getResource({ resourceName: 'contacts', id: 'xxx' });
    const resource = { id: 'xxx', name: 'Mariano R.', email: 'm@r.org' };
    await updateResource({ resourceName: 'contacts', resource });
    await getResource({ resourceName: 'contacts', id: 'xxx' }); */
    /* await getResource({ resourceName: 'contacts', id: 'xxx' });
    await deleteResource({ resourceName: 'contacts', id: 'xxx' });
    await listResources({ resourceName: 'contacts' }); */

    /* const resource = { name: 'The stash', desc: '***' };
    await createResource({ resourceName: 'saleschannels', resource });
    await listResources({ resourceName: 'saleschannels' }); */
    /* await getResource({ resourceName: 'saleschannels', id: 'yyy' });
    const resource = { id: 'yyy', name: 'Main stash' };
    await updateResource({ resourceName: 'saleschannels', resource });
    await getResource({ resourceName: 'saleschannels', id: 'yyy' }); */
    /* await getResource({ resourceName: 'saleschannels', id: 'yyy' });
    await deleteResource({ resourceName: 'saleschannels', id: 'yyy' });
    await listResources({ resourceName: 'saleschannels' }); */

    // await createInvoice();
    // await listInvoices();
    // await downloadInvoice('efg');
    // await deleteInvoice('efg');
    // await listInvoices();
  } catch (demoError) {
    debug(demoError);
  }
})();
