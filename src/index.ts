// Main component
export { default as ModuleSwitcher } from './ModuleSwitcher'

// UI components (can be used by consumers too)
export {
  Popover,
  PopoverTrigger,
  PopoverContent
} from './components/ui/popover'
export { Button, buttonVariants } from './components/ui/button'

// Utilities
export { cn } from './lib/utils'

// Types
export type { ModuleSwitcherProps, ModulePage } from './types'
