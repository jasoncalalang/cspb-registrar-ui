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

The app displays a simple **Hello, world!** message using React.

During development any calls to `/api` are automatically proxied to
`http://localhost:8080` to avoid CORS issues. You can change the target
server in `vite.config.js`.
