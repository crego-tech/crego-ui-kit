# @crego/ui-kit

Shared UI components and utilities for Crego applications.

## Installation

```bash
npm install @crego/ui-kit
```

## Peer Dependencies

This package requires the following peer dependencies to be installed in your project:

```bash
npm install react react-dom react-router-dom lucide-react @radix-ui/react-popover @radix-ui/react-slot
```

## Styling

This package requires Tailwind CSS to be configured in your project with the following theme tokens:

```css
/* tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
}
```

## Usage

### ModuleSwitcher Component

The `ModuleSwitcher` provides a module switcher with a popover interface.

```tsx
import { ModuleSwitcher, type ModulePage } from "@crego/ui-kit";
import { User, Settings, Files } from "lucide-react";

const pages: ModulePage[] = [
  {
    path: "/contacts",
    icon: User,
    label: "Contacts",
    licenseKey: "contacts",
  },
  {
    path: "/settings",
    icon: Settings,
    label: "Settings",
  },
  {
    path: "/documents",
    icon: Files,
    label: "Documents",
    licenseKey: "documents",
  },
];

function App() {
  const [selectedModule, setSelectedModule] = useState(pages[0]);
  const [allowedModules] = useState<string[]>(["contacts", "documents"]);

  const handlePageSwitch = (page: ModulePage) => {
    setSelectedModule(page);
    // Navigate to the page
    navigate(page.path);
  };

  return (
    <ModuleSwitcher
      selectedModule={selectedModule}
      pages={pages}
      onPageSwitch={handlePageSwitch}
      isMinimized={false}
      allowedModules={allowedModules}
    />
  );
}
```

### UI Components

The package also exports individual UI components that you can use:

```tsx
import { Button, Popover, PopoverTrigger, PopoverContent } from "@crego/ui-kit";

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
  );
}
```

### Utilities

```tsx
import { cn } from "@crego/ui-kit";

function MyComponent({ className }) {
  return <div className={cn("base-class", className)}>Content</div>;
}
```

## TypeScript

The package includes full TypeScript support with exported types:

```tsx
import type { ModuleSwitcherProps, ModulePage } from "@crego/ui-kit";
```

## License

MIT
