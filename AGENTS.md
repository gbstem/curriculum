<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

1. This is a Next.js App Router project. See [README.md](README.md) for background on the site, its architecture, and development processes.
2. Use `yarn` as the package manager.
3. Create or update the Jest unit test to have good coverage and to pass for the modified code.
4. If you're updating code in non-minor ways, also run the Cypress e2e test suite via `yarn run cypress` and `yarn build`. It takes a few minutes so do it sparingly.
5. For Cypress e2e tests or other HTTP based testing, try to use my already running dev server on <http://localhost:3000> for testing, but start your own if that isn't running or use `yarn run cypress:run` which starts the server, runs the tests, and then stops the server. But if it fails because the Firestore Emulator isn't running (the Cypress tests check for that early on), ask the user to start the emulator and seed the database as instructed in [README.md](README.md).
6. We use Prettier for code formatting, which you can run via `yarn format`.
7. Before you say you're done, run `yarn lint && yarn test` to unit test the entire project via Jest, and ensure the lint run is clean. If your changes are very minor, such as Jest test-only or CSS-only changes, you may skip running the Cypress tests.
