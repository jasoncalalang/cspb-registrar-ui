# CSPB Registrar UI

This repository contains a minimal React front end created with Vite. Run the following commands to start the development server:

```bash
yarn install
yarn dev
```

To execute the test suite:

```bash
yarn test
```

To generate the Pact contract used by the backend tests execute the Pact
contract suite:

```bash
yarn contract
```

This will create a Pact file under the `pacts/` directory describing the HTTP
interactions exercised by the contract tests.

The app displays a simple **Hello, world!** message using React.

During development any calls to `/api` are automatically proxied to
`http://localhost:8080` to avoid CORS issues. You can change the target
server in `vite.config.js`.
