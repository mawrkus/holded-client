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
      tax: 20, // %
      sku: 'co-gerona-bcn',
    }],
  };
  const invoice = await client.documents.create({ type: docTypes.INVOICE, document });
  debug(invoice);
}

async function listInvoices() {
  debug('Fetching invoices...');
  const invoicesList = await client.documents.list({ type: docTypes.INVOICE });
  debug(invoicesList);
}

async function downloadInvoice(id) {
  debug('Downloading invoice "%s"...', id);
  const { data: base64Pdf } = await client.documents.downloadPdf({ type: docTypes.INVOICE, id });
  const pdfFile = './es/demo/invoice.pdf';

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
  debug('Fetching contact "%s"...', id);
  const contact = await client.contacts.get({ id });
  debug(contact);
}

async function deleteContact(id) {
  debug('Deleting contact "%s"...', id);
  const contact = await client.contacts.delete({ id });
  debug(contact);
}

(async () => {
  try {
    // await createContact();
    // await listContacts();
    // await getContact('abc');
    // await deleteContact('abc');
    // await listContacts();

    // await createInvoice();
    // await listInvoices();
    // await downloadInvoice('xyz');
    // await deleteInvoice('xyz');
    // await listInvoices();
  } catch (demoError) {
    debug(demoError);
  }
})();
