<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

1. This is a Next.js App Router project. See [README.md](README.md) for background on the site, its architecture, and development processes.
2. Use `yarn` as the package manager.
3. Create or update the Jest unit test to have good coverage and to pass for the modified code.
4. If you're updating code in non-minor ways, also run `yarn build`.
5. For HTTP based testing, try to use my already running dev server on <http://localhost:3000> for testing, but start your own if that isn't running.
6. We use Prettier for code formatting, which you can run via `yarn format`.
7. Before you say you're done, run `yarn lint && yarn test` to unit test the entire project via Jest, and ensure the lint run is clean.
