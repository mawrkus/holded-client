const dotEnv = require('dotenv');
const debug = require('debug')('holded:client:demo');
const HoldedClient = require('..');

const env = dotEnv.config({ path: '.env-dev' });
const { HOLDED_API_KEY: apiKey } = env.parsed;

const client = new HoldedClient({ apiKey });
const { types } = client.documents;

async function createInvoice() {
  debug('Creating new invoice...');
  const document = {
    contactCode: 42,
    contactName: 'Antoine',
    desc: 'Space reservations',
    date: Date.now(),
    notes: 'Premium account',
    language: 'es-ES',
    items: [{
      name: '6h chillax coworking Gerona',
      desc: 'Meeting room reservation',
      units: 1,
      subtotal: 300,
      tax: 63,
      sku: 'co-gerona-bcn',
    }],
  };
  const invoice = await client.documents.create({ type: types.INVOICE, document });
  debug(invoice);
}

async function listInvoices() {
  debug('Fetching invoices...');
  const invoicesList = await client.documents.listByType({ type: types.INVOICE });
  debug(invoicesList);
}

async function createContact() {
  debug('Creating new contact...');
  const contact = {
    code: 78,
    name: 'Mariano',
  };
  const newContact = await client.contacts.create({ contact });
  debug(newContact);
}

async function listContacts() {
  debug('Fetching contacts...');
  const contactsList = await client.contacts.list();
  debug(contactsList);
}

async function getContact(id) {
  debug('Fetching contact...');
  const contact = await client.contacts.get({ id });
  debug(contact);
}

async function deleteContact(id) {
  debug('Deleting contact...');
  const contact = await client.contacts.delete({ id });
  debug(contact);
}

/*
holded:demo { status: 1,
holded:demo   id: '5ae5fa632e1d93715b633b64',
holded:demo   invoiceNum: 'F180001',
holded:demo   contactId: '5ae5fa632e1d93715b633b63' } +51ms
*/

(async () => {
  try {
    // await createInvoice();
    // await listInvoices();

    // await createContact();
    // await listContacts();
    // await getContact('5ae5fa632e1d93715b633b63');
    // await deleteContact('5ae5fa632e1d93715b633b63');
    // await getContact('5ae5fa632e1d93715b633b63');
  } catch (demoError) {
    debug(demoError);
  }
})();
