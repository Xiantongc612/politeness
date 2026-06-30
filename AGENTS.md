# AGENTS.md

## Runtime & Toolchain

- **Bun is the only JS runtime.** No Node.js/npm. All scripts and the Tauri `beforeDevCommand`/`beforeBuildCommand` use `bun`.
- **Devbox manages the environment.** First-time setup: `devbox run prepare` (runs `bun install` + `pre-commit install`).
- **Biome handles both linting and formatting.** No ESLint or Prettier. `bun run lint` is read-only; `bun run format` writes fixes.
- **Pre-commit hooks:** Biome auto-formats staged files on commit. On push, the full `devbox run test` pipeline runs (gitleaks → lint → bun test).

## Commands

```
devbox run prepare      # first-time: install deps + git hooks
bun run dev             # Vite dev server (frontend only, port 1420)
bun run tauri dev       # full Tauri app (frontend + Rust backend)
bun run build           # tsc && vite build (typecheck before bundle)
bun test                # run all tests (Bun test runner)
bun test tests/App.test.tsx  # run a single test file
bun run lint            # Biome check (read-only)
bun run format          # Biome check --write
devbox run test         # full CI: gitleaks → lint → tests
bun run tauri build     # production build
bun run tsc --noEmit    # typecheck only (tsc is noEmit, Vite does bundling)
```

## Architecture

```
index.html → src/main.tsx → src/App.tsx   (Preact frontend, bundled by Vite)
src-tauri/src/lib.rs                      (Tauri v2 backend, Rust)
```

- Preact + TypeScript frontend, served by Vite on **port 1420 (strict)**. Tauri's `devUrl`/`beforeDevCommand`/`beforeBuildCommand` expect this.
- Rust backend in `src-tauri/`. `main.rs` calls `lib.rs` (standard Tauri v2 pattern for mobile support).

## Testing

- **Test runner:** Bun (imports from `bun:test`, not Jest).
- **DOM environment:** `happy-dom` (not jsdom). `tests/setup.ts` manually patches `globalThis` with DOM globals (`window`, `document`, `HTMLElement`, etc.).
- **Rendering:** `@testing-library/preact`.
- Test files live in `tests/`. Bun auto-discovers `*.test.*` files.
