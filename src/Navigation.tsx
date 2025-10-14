import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from './components/ui/popover'
import { buttonVariants } from './components/ui/button'
import { cn } from './lib/utils'
import { NavigationProps } from './types'

const Navigation: React.FC<NavigationProps> = ({
  selectedModule,
  pages,
  onPageSwitch,
  isSidebarCollapsed = false,
  renderLicenseGuard
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return selectedModule.path === path
  }

  const renderPage = (page: typeof pages[0]) => {
    const pageElement = (
      <Link
        to={page.path}
        className={cn(
          buttonVariants({
            variant: isActive(page.path) ? 'secondary' : 'ghost',
            size: 'sm'
          }),
          'flex flex-col items-center justify-center h-20 rounded-md p-2',
          {
            'bg-muted': isActive(page.path),
            'hover:bg-secondary': !isActive(page.path)
          }
        )}
        onClick={() => onPageSwitch(page)}
      >
        <page.icon className="h-8 w-8 mb-1" />
        <span className="text-xs">{page.label}</span>
      </Link>
    )

    // If renderLicenseGuard is provided, wrap the page with it
    if (renderLicenseGuard) {
      return renderLicenseGuard(page.module, pageElement)
    }

    return pageElement
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <span
          className={cn(
            'inline-flex items-center cursor-pointer rounded-lg group bg-card hover:bg-muted border-border transition-all',
            isSidebarCollapsed
              ? 'justify-center p-0.5 w-10 h-10'
              : 'justify-between p-0.5'
          )}
        >
          <div className="flex items-center justify-center rounded-lg bg-primary group-hover:bg-primary/90 transition-all h-8 w-8">
            <selectedModule.icon className="h-4 w-4 text-primary-foreground" />
          </div>
          {!isSidebarCollapsed && (
            <span className="ml-2 mr-1 text-sm font-medium text-foreground group-hover:text-foreground/80">
              {selectedModule.label}
            </span>
          )}
          {!isSidebarCollapsed && (
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
                {renderPage(page)}
              </React.Fragment>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Navigation
