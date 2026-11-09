# Guidelines for agents

This file is shared across projects on a similar stack, so keep every guideline
in it generic. State rules in terms of the stack itself, never in terms of this
application or of a framework layered on top of it, and illustrate them with
placeholder names such as `foo` — never with types, components, elements or
fields taken from the code at hand.

When answering a question, answer it directly. Rely on what you already know,
and use web search when you need to confirm something or fill a gap — prefer a
library's own documentation over inspecting its internals. Do not read through
`node_modules` to work out how a dependency behaves, and do not write or execute
throwaway code to establish a fact. Simple shell commands are fine for what they
are genuinely good at, such as searching files, inspecting the project's own
configuration, or checking git history. The distinction is between looking
something up and reverse-engineering it: reach for the former.

## Coding conventions

* **Accessibility attributes:** Do not add `aria-*` or `role` attributes to
  elements.
* **Blank lines:** Add an empty line before and after any multi-line statement
  or block (`if`, `for`, `while`, multi-line function calls, etc.), and between
  variable declaration blocks and other code. The same rule applies to `return`:
  add a blank line before it unless the block contains exactly two single-line
  statements (the one before `return` and the `return` itself). This rule covers
  code only. Markup — JSX, HTML, SVG — never gets blank lines inside a tag,
  between sibling elements, or around an expression container, however many
  lines any of them span.
* **Braces:** Always wrap the body of `if`, `else`, `for`, `while`, and similar
  constructs in curly braces, even when the body is a single statement.
* **Comments:**
  * Write almost none. Names and structure should carry the meaning, and
    anything already settled in conversation does not need restating in the
    code. Never narrate what a line does. Reserve a comment for the rare case
    where the code cannot express *why* it is written that way — a workaround, a
    non-obvious constraint, a deliberate deviation. When one is warranted, give
    it the length the explanation genuinely needs, no more. When in doubt, leave
    it out.
  * The rules below apply to comments that survive that test:
  * Line comments (`//`) should start capitalized. After prefixes like `TODO:`
    the text should also be capitalized. Code references (e.g. variable or
    property names) should always keep their original casing. Short comments
    should not have punctuation. Longer comments (multiple parts or sentences)
    should use correct punctuation.
  * Never use backticks in comments. If something genuinely needs to be quoted
    or highlighted, use double quotes — but prefer leaving identifiers and
    package names unquoted, since they're usually clear from context.
  * Block comments (`/** ... */`) should always use full sentences with correct
    punctuation.
* **Components:** Type all components using React's `FC`: use `FC` for
  components without props and `FC<Props>` for components that accept props.
  Generic components are the exception: `FC<Props<T>>` demands a concrete `T`,
  so annotating one would pin the type parameter and defeat the inference the
  generic exists for. Write them as a plain generic arrow function
  (`const Table = <T,>(props: Props<T>) => …`).
* **Error variables:** Name caught errors `error`, not `e` or `err`.
* **Event handlers:** Name a function after the event it responds to, prefixed
  with `on` (e.g. `onResize`, `onMouseDown`, `onClick`), only when the event is
  its sole caller. If the function is also invoked directly anywhere, name it
  after what it does instead (e.g. `updatePosition`).
* **Exports:**
  * Default-export the one thing a file is primarily about — the component in a
    component file, the value in a fixture file — or whatever it exports when
    that is the only export. Use named exports for everything a file exports
    alongside its default (types, hooks, utilities), and for files that have no
    single main thing.
  * An `index.ts` is a module's public interface, not a convenience re-export.
    Give one to a folder that forms a module, and export only what consumers
    outside that folder need: `components/foo/index.ts` exports the component
    itself, not its subcomponents.
  * Do not add an `index.ts` to a folder that merely groups modules. A single
    file can be a module in its own right.
* **Functions:** Prefer arrow functions unless `this` binding is required.
* **Naming:** Use camelCase for all variables and constants. Do not use
  SCREAMING_SNAKE_CASE.
* **Null:** Avoid `null` in the types the app owns. Declare a field that may be
  absent as optional (`foo?: string`, not `foo: null | string`) and clear it
  with `undefined`. Where an external contract genuinely requires `null`,
  convert at the boundary (`foo ?? null`) rather than carrying it through the
  app.
* **Path aliases:** Reach another area of the app through a path alias (e.g.
  `@/foo`) as defined in `tsconfig.json`; stay inside the current one with a
  relative path. A module's own files are always relative, and so are its
  siblings under a parent that groups related modules, at whatever depth such a
  parent sits. The loose files at the root of an area belong to no such group,
  so one of them keeps its alias even when imported from a module nested inside
  that same area.
* **Props:** Do not destructure props in the function signature. Access them as
  `props.X` to preserve namespacing. For a default value used once, apply it
  inline (`props.color ?? 'red'`); if used more than once, declare a local
  variable with the same name (`const color = props.color ?? 'red'`).
  Destructuring is only acceptable in the rare cases where it is otherwise
  impossible (e.g. computing a rest spread).
* **Return types:** Leave them to inference. This is the default everywhere —
  functions, components, hooks, utilities — not a concession made in awkward
  cases. Annotate only when inference genuinely cannot produce the right type,
  never to restate what TypeScript already knows.
* **Returning undefined:** Use bare `return` instead of `return undefined` where
  possible.
* **Styling:**
  * Use CSS modules (`*.module.css`) for component-specific styles.
  * Name the class for the component's root element `.root` where applicable,
    and declare it first in the stylesheet.
  * Every class that styles an element gets its own top-level rule. Never nest
    one such class inside another, even when the elements are nested in the
    markup.
  * Nest only what cannot stand on its own as a top-level class:
    * Selectors built on the class itself: `&:hover`, `&:focus`,
      `&:first-of-type`, `&::part(foo)`, `& + &`.
    * Variants of the class, which name the modifier alone and nest it as
      `&.variant`. The element keeps its base class and gains the modifier
      conditionally, so `.base` and `.base.variant` — never `.baseVariant`.
    * Bare element selectors, which must be nested to stay scoped to the
      component: `i`, `foo-bar`.
    * Overrides that need a parent for specificity. Nest the override, but
      leave the class its own top-level rule as well — as in
      `.root { & & { .link { … } } }` alongside a top-level `.link`.
  * Nesting needs something to nest into. A rule that declares nothing of its
    own and holds a single nested block is pure overhead: write that block's
    selector at the top level instead, as `.foo:not(:last-child) { … }` rather
    than `.foo { &:not(:last-child) { … } }`.
* **Tests:**
  * Always declare the callback of a test as `async`, even when it awaits
    nothing.
  * Refer to a CSS module class by its plain name, as `toHaveClass('foo')`. The
    test runner is configured to leave those names unscoped, so never import a
    stylesheet into a test to reach one.
  * Name the outermost `describe` after the unit under test — the component,
    hook, or function.
  * Write descriptions as clipped sentences. Keep the verb and the condition,
    drop articles and filler: `renders blue when flag set`, not `renders with a
    blue color when the flag is given`.
  * Drop the article on whatever the verb acts on — its object, or its target
    after a verb like `links to`: `resets password`, `sends email`, `opens login
    modal`, `links to settings`. Drop it inside a trailing prepositional phrase
    too, whether that phrase qualifies the object or the action: `requests posts
    of author`, `opens post link from alert`, `starts session with created
    user`, `renders list sorted by selected column`. A condition made only of
    such a phrase follows the same rule, as in `on last page` under
    `describe('renders button')`.
  * Name a case after its outcome alone where a prop of the same name already
    makes the condition obvious: the test for `image?: string` is `renders
    image`, not `renders image when image given`. Keep the condition wherever
    the prop does not name what it renders, as in `renders button when onClick
    given`, or wherever it is what tells sibling cases apart.
  * Cover a conditional with its positive case only. Do not add a case
    asserting the thing is absent when the condition does not hold — the
    positive case already covers the branch.
  * Group related cases under a `describe` whose description completes into a
    sentence with each test's. Put what the cases have in common on the
    `describe` and what varies on the tests, whichever way round that falls: a
    shared outcome with varying conditions gives `describe('renders bar')`
    wrapping `test('when foo')`, and a shared condition with varying outcomes
    gives `describe('when foo')` wrapping `test('renders bar')`.
  * Group only when cases actually share an outcome or a condition. A test that
    stands alone needs no `describe` beyond the outermost one.
  * Order cases the way the unit presents what they cover — for a component,
    the order its markup renders in — so the file reads alongside its subject
    from top to bottom. A `describe` takes the position of the cases it holds.
    Where there is no such order, any sensible one will do.
* **Type safety:** Strict TypeScript mode is enabled. Avoid `any`.

## Shell commands

Always use the Bash tool first for shell commands. Only if a command does not
work with Bash should you fall back to something else (e.g. the PowerShell /
system shell).

Stay within ordinary Bash commands and the project's own npm scripts. Never
reach for a scripting language or an unrelated external tool to inspect the
project — no `python -c`, no `perl -e`, no `node -e`, whatever happens to be
installed on the machine. Reading a file, searching it, or listing a directory
is what the file and search tools are for, and anything a one-liner would
compute can be read off the file itself. Only if a genuine need cannot be met
any other way may you step outside this, and then say so first.

Run one command per call. Do not chain the quality assurance commands together
with `&&`, and do not append `2>&1` — the Bash tool already returns stderr. Pipe
into `head` or `tail` only when the raw output is genuinely too large to read.

The reason is the permission allowlist in `.claude/settings.json`. A compound
command is split on `&&`, `||`, `;` and `|`, and every segment must match an
allowed pattern on its own. Entries such as `Bash(npm run typecheck)` match that
exact string, so a segment carrying a redirection no longer matches and the
whole command prompts — even though each part of it is allowed.

Reach a tool through its npm script, never through `npx` and never by calling a
binary in `node_modules/.bin` directly. Those bypass the project's own scripts,
and the allowlist does not cover them.

## Quality assurance

After **any** changes to the code, you **MUST** run the following commands to
ensure quality and consistency:

1. **Lint & fix:** `npm run lint:fix`
2. **Stylelint & fix:** `npm run stylelint:fix`
3. **Typecheck:** `npm run typecheck`
4. **Test:** `npm test`

Verify changes exclusively through these commands. Never start the dev server or
otherwise run the app to check a change, even for UI work.

A green run is not the same as a clean one. Whatever a command prints on its way
to passing — an act warning, a warning about invalid markup, a deprecation, an
error thrown past an assertion that still held — counts as part of its result,
so fix what causes it rather than reading past it. Each one is either a defect
the assertions happen not to catch or a gap in the test setup, and every warning
left  standing is one more line to scan before the next real failure is visible.

While iterating on a single file, pass it to the test command as
`npm test -- path/to/foo.test.ts`, which the allowlist entry `Bash(npm test *)`
covers. Run the whole suite, along with the other three commands, before
treating a change as verified.

Do not write throwaway files to prove something works — no scratch components,
no temporary type assertions, no one-off scripts, whether inside the project or
outside it. The commands above are the only accepted verification. If they pass,
the change is verified; if something can only be proven by extra scaffolding,
say so instead of building it.
