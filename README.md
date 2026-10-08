<p align="center">
    <img src="https://ldaprecord.com/logo.svg" width="300" alt="LdapRecord.com">
</p>

<p align="center">The official documentation website for LdapRecord.</p>

<p align="center">
    <a href="https://github.com/DirectoryTree/LdapRecord.com/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/DirectoryTree/LdapRecord.com?style=flat-square" alt="License"></a>
</p>

<p align="center">
    <a href="#local-development">Local Development</a>
    <span> · </span>
    <a href="https://ldaprecord.com">Documentation</a>
    <span> · </span>
    <a href="https://github.com/DirectoryTree/LdapRecord">LdapRecord Core</a>
    <span> · </span>
    <a href="https://github.com/DirectoryTree/LdapRecord-Laravel">Laravel Integration</a>
</p>

---

## Local Development

Use Node.js 22, as specified in `.nvmrc` and `.node-version`.

Clone the website with its documentation submodule, then install the dependencies and start the development server:

```bash
git clone --recurse-submodules https://github.com/DirectoryTree/LdapRecord.com.git
cd LdapRecord.com
npm ci
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to preview the website.

If you've already cloned the repository, initialize the documentation submodule first:

```bash
git submodule update --init --recursive
```

## Editing Documentation

The versioned documentation lives in `src/app/docs`, a Git submodule of [LdapRecord-Docs](https://github.com/DirectoryTree/LdapRecord-Docs). Submit documentation changes to that repository. Start with the [core quickstart](https://ldaprecord.com/docs/core/v4/quickstart/) for an overview of LdapRecord. Website components, layouts, and navigation live in this repository under `src`.

The search index is generated automatically during development and builds. To regenerate it manually, run:

```bash
npm run build:search
```

## Building

Generate the static website:

```bash
npm run build
```

The exported website is written to `out`.
