import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from './components/ui/popover'
import { buttonVariants } from './components/ui/button'
import { cn } from './lib/utils'
import { ModuleSwitcherProps } from './types'
import { Link } from 'react-router-dom'

const ModuleSwitcher: React.FC<ModuleSwitcherProps> = ({
  selectedModule,
  pages,
  isMinimized = false,
  allowedModules
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return selectedModule.path === path
  }

  const isAllowed = (licenseKey: string) => {
    if (!allowedModules) return true
    if (licenseKey === '') return true
    return allowedModules?.includes(licenseKey)
  }

  const getPageClassName = (path: string) => {
    const isPageActive = isActive(path)
    return cn(
      buttonVariants({
        variant: isPageActive ? 'secondary' : 'ghost',
        size: 'sm'
      }),
      'flex flex-col items-center justify-center h-20 rounded-md p-2',
      {
        'bg-muted': isPageActive,
        'hover:bg-secondary': !isPageActive
      }
    )
  }

  const renderPage = (page: (typeof pages)[0]) => {
    const className = getPageClassName(page.path)
    const content = (
      <>
        <page.icon className="h-8 w-8 mb-1" />
        <span className="text-xs">{page.label}</span>
      </>
    )

    if (!(page?.useRouter ?? true)) {
      return (
        <a href={page.path} className={className}>
          {content}
        </a>
      )
    }

    return (
      <Link to={page.path} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span
          className={cn(
            'inline-flex items-center cursor-pointer rounded-lg group bg-card hover:bg-muted border-border transition-all',
            isMinimized
              ? 'justify-center p-0.5 w-10 h-10'
              : 'justify-between p-0.5'
          )}
        >
          <div className="flex items-center justify-center rounded-lg bg-primary group-hover:bg-primary/90 transition-all h-8 w-8">
            <selectedModule.icon className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isMinimized && (
            <span className="ml-2 mr-1 text-sm font-medium text-foreground group-hover:text-foreground/80">
              {selectedModule.label}
            </span>
          )}
          {!isMinimized && (
            <ChevronDown
              className={cn(
                'h-4 w-4 text-muted-foreground ml-1 mr-1 transition-all group-hover:text-foreground',
                {
                  'rotate-180': isOpen
                }
              )}
            />
          )}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="p-2">
          <div className="text-sm font-medium text-muted-foreground px-2 py-1.5">
            Switch to
          </div>
          <div className="grid grid-cols-4 gap-2 pt-1">
            {pages.map((page) => (
              <React.Fragment key={page.path}>
                {isAllowed(page.licenseKey ?? '') && renderPage(page)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ModuleSwitcher
