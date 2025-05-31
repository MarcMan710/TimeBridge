import { ClockIcon, CalendarIcon, HomeIcon, GlobeAltIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { NavigationItem, Feature } from '@/types'

export const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Time Zone Converter', href: '/converter', icon: ClockIcon },
  { name: 'Meeting Scheduler', href: '/scheduler', icon: CalendarIcon },
]

export const features: Feature[] = [
  {
    name: 'Time Zone Converter',
    description: 'Compare times between multiple cities with an intuitive visual interface.',
    icon: ClockIcon,
  },
  {
    name: 'Meeting Scheduler',
    description: 'Plan meetings across time zones with smart suggestions for optimal times.',
    icon: CalendarIcon,
  },
  {
    name: 'Timezone Search',
    description: 'Quickly find and manage time zones with our powerful search feature.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Team Coordination',
    description: 'Coordinate with team members across the globe effortlessly.',
    icon: UserGroupIcon,
  },
  {
    name: 'Availability View',
    description: 'Visualize team availability with our color-coded calendar view.',
    icon: ChartBarIcon,
  },
]

export const MEETING_DURATIONS = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
]

export const DEFAULT_WORKING_HOURS = {
  start: '09:00',
  end: '17:00',
} 