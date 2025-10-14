import { LucideProps } from 'lucide-react'

export interface ModulePage {
  path: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  label: string
  module?: string
  subPages?: string[]
}

export interface NavigationProps {
  selectedModule: ModulePage
  pages: ModulePage[]
  onPageSwitch: (page: ModulePage) => void
  isSidebarCollapsed?: boolean
  renderLicenseGuard?: (module: string | null | undefined, children: React.ReactNode) => React.ReactNode
}
