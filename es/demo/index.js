const fs = require('fs');
const dotEnv = require('dotenv');
const debug = require('debug')('holded:client:demo');
const HoldedClient = require('..');

const env = dotEnv.config({ path: '.env-dev' });
const { HOLDED_API_KEY: apiKey } = env.parsed;

const client = new HoldedClient({ apiKey });
const { types: docTypes } = client.documents;

/* eslint no-unused-vars: warn */

function listDocuments({ type }) {
  return client.documents.list({ type });
}

function createDocument({ type, document }) {
  return client.documents.create({ type, document });
}

function updateDocument({ type, id, document }) {
  return client.documents.update({ type, id, document });
}

async function downloadDocument({ type, id, file }) {
  const { data: base64Pdf } = await client.documents.downloadPdf({ type, id });
  const pdfFile = `./es/demo/out/${type}-${file}`;

  try {
    fs.unlinkSync(pdfFile);
  } catch (e) {
    // nothing to do
  }

  fs.writeFileSync(pdfFile, base64Pdf, { encoding: 'base64' });
  debug('PDF invoice file saved to "%s".', pdfFile);
  return pdfFile;
}

function deleteDocument({ type, id }) {
  return client.documents.delete({ type, id });
}

function listResources({ resourceName }) {
  return client[resourceName].list();
}

function createResource({ resourceName, resource }) {
  return client[resourceName].create({ resource });
}

function getResource({ resourceName, id }) {
  return client[resourceName].get({ id });
}

function updateResource({ resourceName, id, resource }) {
  return client[resourceName].update({ id, resource });
}

function deleteResource({ resourceName, id }) {
  return client[resourceName].delete({ id });
}

(async () => {
  const resources = [{
    name: 'contacts',
    data: { name: 'Mariano R.', code: '78' },
  }, {
    name: 'saleschannels',
    data: { name: 'Main store', desc: 'Barcelona store in Pg de G' },
  }, {
    name: 'products',
    data: { name: 'Radiometer' },
  }, {
    name: 'warehouses',
    data: { name: 'Main warehouse' },
  }, {
    name: 'treasury',
    data: {},
  }, {
    name: 'expensesaccounts',
    data: { name: 'Main account', desc: '*****' },
  }, {
    name: 'payments',
    data: { amount: 99, desc: 'For good services' },
  }];

  resources.forEach(async ({ name: resourceName, data: resource }) => {
    try {
      const { id } = await createResource({ resourceName, resource });
      await listResources({ resourceName });
      await getResource({ resourceName, id });

      const shouldUpdate = Boolean(resource.name);
      if (shouldUpdate) {
        const updatedResource = { ...resource, id, name: `${resource.name} -> updated` };
        await updateResource({ resourceName, id, resource: updatedResource });
        await getResource({ resourceName, id });
      } else {
        debug('Skipping update.');
      }

      await getResource({ resourceName, id });
      await deleteResource({ resourceName, id });
      await listResources({ resourceName });
    } catch (demoError) {
      debug(demoError);
      if (demoError.response) {
        debug(demoError.response.data);
      }
    }
  });

  try {
    const type = docTypes.SALESRECEIPT;
    const document = {
      salesChannelId: '5ae61a9b2e1d933c6806be13',
      contactCode: 42,
      contactName: 'Antoine',
      date: Date.now() / 1000, // PHP on the backend baby
      notes: 'Services provided to Antoine',
      language: 'en',
      products: [{
        name: '6h chillax coworking Gerona',
        desc: 'Meeting room reservation',
        units: 1,
        subtotal: 300,
        tax: 20, // %
        sku: 'co-gerona-bcn',
      }],
    };

    const { id } = await createDocument({ type, document });
    await listDocuments({ type });
    await downloadDocument({ type, id, file: 'antoine.pdf' });

    await updateDocument({ type, id, document: { language: 'fr', notes: 'Updated services' } });
    await downloadDocument({ type, id, file: 'antoine-updated.pdf' });

    await deleteDocument({ type, id });
    await listDocuments({ type });
  } catch (demoError) {
    debug(demoError);
    if (demoError.response) {
      debug(demoError.response.data);
    }
  }
})();
