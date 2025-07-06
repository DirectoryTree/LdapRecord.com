# LdapRecord Documentation

The official documentation website for LdapRecord - a fully-featured Active Record ORM that makes working with LDAP directories a breeze.

## About LdapRecord

LdapRecord is a PHP package that provides you with a full ActiveRecord implementation for working with your LDAP server. Each LDAP object type has a corresponding "Model" which is used to interact with that type. An LDAP object type is determined by its object classes.

### Key Features

- **🚀 Up and Running Fast** - Connect to your LDAP servers and start running queries in minutes
- **🔥 Supercharged Active Record** - Create and modify LDAP objects with minimal code
- **🔧 Framework Agnostic** - Works with any PHP framework or standalone applications
- **🎯 Laravel Integration** - Seamless Laravel integration with authentication and user sync
- **📚 Comprehensive Documentation** - Extensive guides and examples for all use cases

### Packages

- **[LdapRecord Core](https://github.com/DirectoryTree/LdapRecord)** - The foundation package for any PHP application
- **[LdapRecord-Laravel](https://github.com/DirectoryTree/LdapRecord-Laravel)** - Laravel integration with authentication and user synchronization

## Development Setup

This documentation site is built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com).

### Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

### Project Structure

- `/src/app/docs/` - Documentation content organized by package and version
- `/src/components/` - Reusable React components
- `/src/lib/` - Utility functions and navigation configuration
- `/src/mdx/` - MDX processing and search functionality

## Features

### Global Search

The documentation includes a powerful search feature powered by [FlexSearch](https://github.com/nextapps-de/flexsearch). Access it by:
- Clicking the search input in the navigation
- Using the `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) keyboard shortcut

The search automatically indexes all documentation pages and provides instant results.

### Version Management

The site supports multiple versions of both LdapRecord Core and LdapRecord-Laravel packages, with easy switching between versions via the navigation.

### Dark Mode

Built-in dark mode support with automatic system preference detection.

## Contributing

We welcome contributions to improve the documentation! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b improve-docs`)
3. **Make your changes** - Edit MDX files in `/src/app/docs/`
4. **Test locally** - Run `npm run dev` to preview changes
5. **Submit a pull request**

### Documentation Guidelines

- Use clear, concise language
- Include code examples where helpful
- Follow the existing structure and formatting
- Test all code examples before submitting

## Technology Stack

This documentation site is built with modern web technologies:

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[MDX](https://mdxjs.com)** - Markdown with React components
- **[FlexSearch](https://github.com/nextapps-de/flexsearch)** - Full-text search
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Headless UI](https://headlessui.dev)** - Unstyled, accessible UI components
- **[Shiki](https://shiki.matsu.io)** - Syntax highlighting

## Links

- **[LdapRecord Core Repository](https://github.com/DirectoryTree/LdapRecord)**
- **[LdapRecord-Laravel Repository](https://github.com/DirectoryTree/LdapRecord-Laravel)**
- **[Documentation Website](https://ldaprecord.com)**
- **[Issue Tracker](https://github.com/DirectoryTree/LdapRecord/issues)**
- **[Sponsor the Project](https://github.com/sponsors/stevebauman)**

## License

The LdapRecord packages are open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
