# @crego/ui-kit

Shared UI components and utilities for Crego applications.

## Installation

```bash
npm install @crego/ui-kit
```

## Peer Dependencies

This package requires the following peer dependencies to be installed in your project:

```bash
npm install react react-dom lucide-react @radix-ui/react-popover @radix-ui/react-slot react-router
```

## Styling

This package requires Tailwind CSS to be configured in your project :

### Use the Tailwind Plugin

Add the UI kit's Tailwind plugin to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@crego/ui-kit/**/*.js'
  ],
  plugins: [require('@crego/ui-kit/tailwind-plugin')]
}
```

## Usage

### ModuleSwitcher Component

The `ModuleSwitcher` provides a module switcher with a popover interface. By default, all pages use React Router navigation unless explicitly disabled.

```tsx
import { ModuleSwitcher, type ModulePage } from '@crego/ui-kit'
import { User, Settings, Files } from 'lucide-react'

const pages: ModulePage[] = [
  {
    path: '/contacts',
    icon: User,
    label: 'Contacts',
    licenseKey: 'contacts'
    // useRouter defaults to true - will use React Router Link
  },
  {
    path: '/settings',
    icon: Settings,
    label: 'Settings'
    // useRouter defaults to true - will use React Router Link
  },
  {
    path: '/documents',
    icon: Files,
    label: 'Documents',
    licenseKey: 'documents',
    useRouter: false // Explicitly use regular anchor tag
  },
  {
    path: 'https://external-site.com',
    icon: ExternalLink,
    label: 'External Link',
    useRouter: false // Use anchor tag for external links
  }
]

function App() {
  const [selectedModule, setSelectedModule] = useState(pages[0])
  const [allowedModules] = useState<string[]>(['contacts', 'documents'])

  return (
    <ModuleSwitcher
      selectedModule={selectedModule}
      pages={pages}
      isMinimized={false}
      allowedModules={allowedModules}
    />
  )
}
```

#### Navigation Behavior

- **Default**: All pages use React Router's `<Link>` component for client-side navigation
- **External Links**: Set `useRouter: false` for external URLs or when you need regular anchor tag behavior
- **Mixed Usage**: You can mix React Router links and anchor tags in the same switcher

### UI Components

The package also exports individual UI components that you can use:

```tsx
import { Button, Popover, PopoverTrigger, PopoverContent } from '@crego/ui-kit'

function MyComponent() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Popover content</p>
      </PopoverContent>
    </Popover>
  )
}
```

### Utilities

```tsx
import { cn } from '@crego/ui-kit'

function MyComponent({ className }) {
  return <div className={cn('base-class', className)}>Content</div>
}
```

## TypeScript

The package includes full TypeScript support with exported types:

```tsx
import type { ModuleSwitcherProps, ModulePage } from '@crego/ui-kit'
```

## Versioning and Publishing

This package uses automated versioning and publishing with npm versioning and GitHub Actions.

### Quick Start

**Release a new version**:

```bash
# For bug fixes (1.3.5 → 1.3.6)
npm version patch

# For new features (1.3.5 → 1.4.0)
npm version minor

# For breaking changes (1.3.5 → 2.0.0)
npm version major
```

### What Happens Automatically

When you run `npm version`, the system will:

- Update the version in `package.json`
- Create a git tag (e.g., `v1.3.6`)
- Push changes and tags to GitHub
- Trigger GitHub Actions to build and publish the package
- Create a GitHub release

### Prerequisites

- NPM authentication token set as `NPM_TOKEN` in GitHub repository secrets
- GitHub repository with Actions enabled
- All changes committed to git

For detailed instructions, see [VERSIONING.md](./VERSIONING.md).

## Local Development

When developing the UI kit locally and using it in your main application, you can set up a local development workflow using npm link.

### Setting up Local Development

1. **Build the UI kit package:**

   ```bash
   cd /path/to/crego-ui-kit
   npm run build
   ```

2. **Create a global link for the package:**

   ```bash
   cd /path/to/crego-ui-kit
   npm link
   ```

3. **Link the package in your consuming project:**

   ```bash
   cd /path/to/your-main-app
   npm link @crego/ui-kit
   ```

4. **Verify the link was created:**
   ```bash
   ls -la node_modules/@crego/ui-kit
   # Should show a symlink pointing to your local package
   ```

### Development Workflow

1. **Start the UI kit in watch mode:**

   ```bash
   cd /path/to/crego-ui-kit
   npm run dev
   ```

   This will watch for changes and rebuild automatically.

2. **Start your main application:**

   ```bash
   cd /path/to/your-main-app
   npm run dev
   ```

3. **Make changes to the UI kit** and they'll be reflected in your main app after the watch rebuilds!

### Alternative: File Protocol

If you prefer not to use npm link, you can also use the file protocol in your consuming project's `package.json`:

```json
{
  "dependencies": {
    "@crego/ui-kit": "file:../crego-ui-kit"
  }
}
```

Then run `npm install` to update the dependency.

### Unlinking

To return to using the published version of the package:

```bash
cd /path/to/your-main-app
npm unlink @crego/ui-kit
npm install @crego/ui-kit@latest
```

## License

MIT
