# QuestsDemotion

A Vencord userplugin that stops Discord from opening on the Quests page at startup. Discord opens on the page you last had open instead.

## Install

Custom Vencord plugins need Vencord built from source. You need [git](https://git-scm.com), [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io).

```sh
git clone https://github.com/Vendicated/Vencord
cd Vencord
pnpm install --frozen-lockfile
```

Copy this folder to `src/userplugins/questsDemotion`, so that `index.ts` ends up at `src/userplugins/questsDemotion/index.ts`. Then:

```sh
pnpm build
pnpm inject
```

Restart Discord and enable **QuestsDemotion** in Settings → Vencord → Plugins. Restart Discord once more so the patch applies.

## License

GPL-3.0-or-later
