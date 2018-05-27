# 💎 Holded invoice API client

[![npm](https://img.shields.io/npm/l/holded-client.svg)](https://www.npmjs.org/package/holded-client) [![npm](https://img.shields.io/npm/v/holded-client.svg)](https://www.npmjs.org/package/holded-client)
![Node version](https://img.shields.io/node/v/holded-client.svg?style=flat-square)

A Node.js client for the Holded *invoice* API v1.0, see https://developers.holded.com/

## Installation

```bash
yarn install holded-client
```

## Usage

For example:

```js
const HoldedClient = require('holded-client');

const client = new HoldedClient({ apiKey: 'your private api key' });

const { docTypes } = client.documents;

const invoicesList = await client.documents.list({ type: docTypes.INVOICE });
```

## API

The client exposes the following Promise-based APIs:

- `contacts`
- `saleschannels`
- `products`
- `warehouses`
- `treasury`
- `expensesaccounts`
- `payments`
- `documents`

Each api exposes the following methods:

- `list()`
- `create({ resource })`
- `get({ id })`
- `update({ id, resource })`
- `delete({ id })`

Except for the documents API:

- `list({ type })`
- `get({ type, id })`
- `create({ type, document })`
- `downloadPdf({ type, id })`
- `update({ type, id, document })`
- `delete({ type, id })`
- `pay({ type, id, payment })`

## Testing

Clone the repository and execute:

```bash
yarn test
```

## Contribute

1. Fork it: `git clone https://github.com/mawrkus/holded-client.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Check the build: `npm run build`
5. Push to the branch: `git push origin my-new-feature`
6. Submit a pull request :D

## Roadmap

- Invoice API -> `/numberingseries` support
- Projects API?
- CRM API?
