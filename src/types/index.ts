import { LucideProps } from 'lucide-react'

export interface ModulePage {
  path: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  label: string
  licenseKey?: string
  subPages?: string[]
}

export interface ModuleSwitcherProps {
  selectedModule: ModulePage
  pages: ModulePage[]
  onPageSwitch: (page: ModulePage) => void
  isSidebarCollapsed?: boolean
  renderLicenseGuard?: (module: string | null | undefined, children: React.ReactNode) => React.ReactNode
}
