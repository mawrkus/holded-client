# Holded invoice API client

A client for the Holded invoice API v1.0, see https://developers.holded.com/

## Installation

```bash
npm install holded-client
```

## Usage

```js
const HoldedClient = require('holded-client');

const client = new HoldedClient({ apiKey: 'your private api key' });

const { types } = client.documents;

const invoicesList = await client.documents.listByType({ type: types.INVOICE });
```

## Testing

Clone the repository and execute:

```bash
npm test
```

## Contribute

1. Fork it: `git clone https://github.com/mawrkus/holded-client.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Check the build: `npm run build`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request :D
