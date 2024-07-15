import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentDuplicateIcon, ChartPieIcon } from '@heroicons/react/20/solid'
import { WrenchIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Archive', href: '#', icon: FolderIcon, current: false },
    { name: 'Special Order Parts', href: '#', icon: WrenchIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
  ]
  const teams = [
    { id: 1, name: 'Loaners', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Insurance Company', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
  ]
  const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
  ]

  export { navigation, teams, userNavigation }