# Styling

Every style is a Tailwind class. Bootstrap is gone, and `tailwindcss/no-custom-classname` fails lint on any class Tailwind doesn't know, so a Bootstrap class (`d-flex`, `fw-semibold`, `mb-3`) or a typo can't creep back in.

## Components

Interactive widgets are [Headless UI](https://headlessui.com/): `Menu` for the navigation dropdowns in `AuthGate.tsx`, and `Dialog` inside `app/components/Modal.tsx`, which every dialog uses (`<Modal>` with `ModalHeader`, `ModalBody`, `ModalFooter`). `Alert.tsx` and `Spinner.tsx` cover the error box and the loading ring, and `cardStyles.ts` the lifting track and course cards.

## `app/globals.css`

It holds everything that isn't a utility class, in this order:

- **`@custom-variant narrow`**: 768px and below. Unlike Tailwind's `max-md:` it includes 768px itself, which is an iPad held upright; the editor's stacked phone layout and a few font sizes switch here, and `EditorModal`'s divider checks the same width in JavaScript.
- **`@theme`**: the tokens. Breakpoints are Bootstrap's (576/768/992/1200/1400px), not Tailwind's defaults, so `lg:` means 992px here. Named colors (`navy`, `sky`, `primary`, `success`, `danger`, `muted`, ...), heading and display sizes (`text-h4`, `text-display-4`, `text-lead`) and fonts (`font-montserrat`, `font-space-mono`) exist so markup doesn't repeat arbitrary values. Add a token rather than a third copy of an arbitrary value.
- **`@layer base`**: default styles for bare elements (heading sizes, paragraph margins, the 1.2rem Montserrat body text). Utilities always beat these, so `<p className="mb-0">` really has no bottom margin.
- **`@layer components`**: `btn` with a color (`btn-primary`, `btn-outline-danger`, `btn-banner`, ...) and optional size (`btn-sm`, `btn-lg`), for both `<button>` and links; `input` and `select` for form fields. A track's button color in `app/data/tracks.ts` is just the suffix (`variant: 'warning'`). Lint whitelists these names because it can't see this layer.
- **`@utility site-container`**: the centered, padded page column with stepped max-widths. Use it instead of Tailwind's `container`, whose widths differ.
- **`.lesson-editor` rules at the end**: overrides for the markdown editor library's own classes (`.w-md-editor-*`). They sit outside Tailwind's layers, with `!important`, because the library's stylesheet is unlayered and would win otherwise. That's the only place this is acceptable.

## Two traps when editing classes

- **`leading-<n>` and `text-<size>` aren't what they look like.** In Tailwind v4 `leading-1.2` means 1.2 × 0.25rem and only exists on quarter steps, and `text-xl` sets a line height as well as a font size. The eslint plugin's autofix suggests both as "simpler" replacements and can silently change a layout; use `leading-heading`, `text-h5` and friends instead, and never run `eslint --fix` without checking the diff.
- **Margins between siblings collapse.** A wrapper whose last child has a bottom margin uses `flow-root` so the margin stays inside it (see `Footer.tsx`, `LearningPath.tsx`). Removing it changes the spacing below.
