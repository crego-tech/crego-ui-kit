import { LucideProps } from 'lucide-react'

export interface ModulePage {
  path: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  label: string
  licenseKey?: string
  subPages?: string[]
  useRouter?: boolean
}

export interface ModuleSwitcherProps {
  selectedModule: ModulePage
  pages: ModulePage[]
  isMinimized?: boolean
  allowedModules?: string[]
}
