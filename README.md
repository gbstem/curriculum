# gbSTEM Curriculum Website

<https://curriculum.gbstem.org/>

## Description

> Inspiring the Next Generation of STEM Innovators

The Greater Boston STEM Program delivers free introductory computer science, math, engineering, and science enrichment to elementary and middle school students.

This website is Greater Boston STEM Program's website for instructors to review their curriculums, password protected to limit access to just gbSTEM instructors. **It is primarily maintained by a rotating group of High School and college students.** Because of this, maintaining clear, readable code and robust documentation is highly prioritized.

## Frameworks and Libraries

This project relies on several key modern web technologies:

- **[Next.js](https://nextjs.org)**: The core React framework used for building the site. We use the modern "App Router" (`app/` directory) for routing, server-side rendering, and static site generation.
  - _Learn more_: [Next.js Documentation](https://nextjs.org/docs) or the [Learn Next.js](https://nextjs.org/learn) tutorial.
- **[React](https://react.dev/)**: The underlying JavaScript library for building user interfaces and component-based architecture.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly typed programming language that builds on JavaScript, giving you better tooling and strict type-checking at any scale.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.
- **[Bootstrap](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.netlify.app/)**: Used for rapid, responsive UI development. React-Bootstrap replaces the standard Bootstrap JavaScript with native React components (like `Accordion`, `Carousel`, and `Modal`).
- **[Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)**: Our primary testing suite. We use Jest to write unit tests for components to ensure they render properly and maintain high code coverage, preventing regressions as the codebase is passed between different high school maintainers.
- **[Cypress](https://www.cypress.io/)**: Used for end-to-end integration tests, ensuring the live site functions correctly in a real browser.
- **[iron-session](https://github.com/vvo/iron-session)**: Used for secure, stateless, and encrypted session management. Cookies are encrypted on the server side and decrypted automatically.
- **[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)**: Used to render formatted code snippets with robust syntax highlighting in curriculum views and code block creation modal previews.
- **[scratchblocks-react](https://github.com/scratchblocks/scratchblocks-react)**: Used to parse Scratch block text representation and render it as graphical Scratch programming blocks directly inside our lesson contents.

## Getting Started with Development

### 1. Environment Configuration

Before running the development server, you must configure your local environment variables:

1. Copy the `.env.example` file to create a `.env.local` file:

   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and adjust the placeholder values with your actual service credentials, preferably development credentials if available.

> [!WARNING]
> **Never commit your `.env.local` file or actual secrets to GitHub.** This file is configured to be ignored by Git to prevent exposing sensitive API keys and credentials. For details on how `.env` files work and how to avoid exposing credentials, read the [dotenv environment secrets guide](https://github.com/motdotla/dotenv#should-i-commit-my-env-file) and [GitHub's guide on ignoring files](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files).

### 2. Firebase Emulator Suite (Local Development)

For local development and testing, it is **very important** to use the **Firebase Emulator Suite** to run local instances of Firebase products (Firestore, Authentication, and Storage).

Testing against a local emulator rather than the production database:

- **Protects Production Data**: Prevents accidental database corruption or unintended changes from local development bugs or testing.
- **Enables Risk-Free Testing**: Allows you to safely test writes, deletes, and complex updates without any fear of damaging real client or course records.
- **Offline Capability**: Allows you to run the application fully offline.

#### Seeding the Emulator with Production Data

To test with representative data, you can copy data from the live production Firestore into your local emulator:

1. **Configure Production Credentials**: Open `.env.local` and ensure your production credentials (`NEXT_PUBLIC_FIREBASE_PROJECT_ID` or `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY`) are temporarily set. Make sure they are NOT commented out.
2. **Pull Live Data**: Download the data from the production collections by running:

   ```bash
   yarn db:pull
   ```

   This will download the `curriculum` and `curriculum_versions` collections and save them in a local, Git-ignored file named `firebase-backup.json`.

3. **Point to Local Emulators**: To route client and server operations to the emulator, uncomment the emulator environment variables at the bottom of your `.env.local` file:

   ```env
   FIRESTORE_EMULATOR_HOST="127.0.0.1:8080"
   FIREBASE_AUTH_EMULATOR_HOST="127.0.0.1:9099"
   STORAGE_EMULATOR_HOST="127.0.0.1:9199"
   ```

   Ensure these ports match your emulator configurations in `firebase.json`.

4. **Start the Emulator**: Set up and start the emulator suite locally:
   - Follow the official [Firebase Emulator Suite: Connect and Prototype](https://firebase.google.com/docs/emulator-suite/connect_and_prototype?database=Firestore) guide to run the emulators on your local machine.
   - Start the emulators using the Firebase CLI:

     ```bash
     firebase emulators:start
     ```

5. **Seed the Emulator**: While the emulator is running, import the downloaded production data backup by running:

   ```bash
   yarn db:seed
   ```

   The emulator is now seeded with live-representative records and ready for local development!

> [!WARNING]
> By default, the Firestore emulator runs in-memory. This means all seeded data and modifications are lost whenever you restart the emulator. If you want to persist the database state across restarts, start the emulator with the `--import` and `--export-on-exit` flags:
>
> ```bash
> firebase emulators:start --import=./emulator-data --export-on-exit
> ```
>
> Otherwise, you must re-run the seed script (`yarn db:seed`) every time you restart the emulator.

### 3. Run the Development Server

```bash
# install dependencies
yarn install

# run the development server
yarn dev

# automatically format code
yarn format

# check for style issues
yarn lint

# run unit tests
yarn test

# run real browser end-to-end integration tests
yarn cypress

# build for production
yarn build

# start a production-like server
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result for `yarn dev` or `yarn start`. You can start editing any page or component, and when running in `yarn dev` mode, your changes will be reflected in the browser automatically.

## Updating Dependencies

It is important to periodically update the project's dependencies to address security vulnerabilities, receive bug fixes, improve performance, and keep up with the latest Next.js and React features. Since this project is maintained by a rotating group of students, regular updates prevent the codebase from falling behind or becoming incompatible with modern deployment platforms like Vercel.

We use the [npm-check-updates (ncu)](https://github.com/raineorshine/npm-check-updates) tool to check for and apply updates. Refer to the [installation instructions](https://github.com/raineorshine/npm-check-updates#installation) to install it.

Once `ncu` is installed, follow this sequence of commands to update dependencies:

```bash
# Update the dependencies in package.json to the latest versions
ncu -u

# Install the updated packages and update yarn.lock
yarn install

# Run unit tests to verify no breaking changes were introduced
yarn test

# Start a development server and run the Cypress test suite
yarn dev &
yarn cypress

# Run lint checks to ensure code style consistency
yarn lint

# Go to http://localhost:3000 and do manual visual checks and tests

# Build the project for production to verify compatibility and compile-time checks
yarn build
```

After verifying that the tests, linting, and build pass successfully, commit and submit both `package.json` and `yarn.lock` to the repository.

## Deploy on Vercel

We use [Vercel](https://vercel.com/) for deployment. They are the creators and main sponsors of Next.js. You can preview changes by pushing branches to this repository, and preview and production URLs will automatically be provided by the Vercel bot.

## Directory and File Index

Below is an alphabetical list of the top-level directories and significant configuration files to help you navigate the codebase:

### Directories

- **`.husky/`**: Configuration for Husky, managing Git hooks like pre-commit formatting and linting.
- **`__tests__/`**: Contains all of our Jest unit tests. Tests are organized generally by route or component domain (e.g. `programs.test.tsx`, `components.test.tsx`).
- **`app/`**: The core Next.js App Router directory. This handles the application's URL routing. Each subdirectory (like `cs/`, `math/`) with a `page.tsx` file inside represents a distinct page on the site.
- **`components/`**: Reusable React UI components that are imported across multiple pages (e.g., `Navigation.tsx`, `Footer.tsx`, `ClassPage.tsx`). Keeping logic componentized keeps our page files clean.
- **`cypress/`**: Contains our Cypress end-to-end integration tests and configurations, verifying the live site functions correctly in a real browser.
- **`lib/`**: Contains library utilities and centralized static data constants (like the lists of FAQ questions in `faqData.ts` and the team member information in `teamMembers.ts`).
- **`public/`**: Static assets such as images, logos, and icons that can be accessed publicly by the browser.

### Files

- **`.gitignore`**: Specifies which files and directories Git should ignore (like `node_modules/` and `.next/`).
- **`.prettierignore`**: Specifies which files and directories Prettier should ignore when formatting.
- **`.prettierrc`**: Configuration rules for Prettier, ensuring consistent code formatting across the project.
- **`AGENTS.md`**: Custom rules and guidelines for AI coding agents interacting with the repository.
- **`cypress.config.ts`**: The configuration file for our Cypress end-to-end testing environment.
- **`eslint.config.mjs`**: Configuration rules for ESLint, ensuring consistent code style and checking for common errors across the project.
- **`jest.config.ts`**: The configuration file for our Jest testing environment, specifically tailored to work alongside Next.js.
- **`jest.setup.ts`**: Initial setup code that runs before our Jest tests, importing tools like `@testing-library/jest-dom` for custom DOM matchers.
- **`next-env.d.ts`**: Automatically generated TypeScript declaration file that ensures the Next.js types are picked up by the compiler. Do not edit manually.
- **`next.config.ts`**: General Next.js build and server configuration file.
- **`package.json`**: Defines the project's details, scripts (like `yarn dev`), and dependencies (the npm packages we rely on).
- **`postcss.config.mjs`**: Configuration for PostCSS, typically used for transforming CSS with plugins.
- **`README.md`**: You are reading this file! It contains the project's onboarding documentation.
- **`tsconfig.json`**: Configuration settings for the TypeScript compiler, including our path aliases (like `@/` mapping to the root).
- **`yarn.lock`**: An automatically generated file that locks down the exact versions of dependencies used, ensuring that all developers have identical, reproducible environments.
