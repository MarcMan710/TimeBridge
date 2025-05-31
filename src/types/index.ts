export interface TimeZone {
  id: string
  name: string
  offset: string
}

export interface Participant {
  id: string
  name: string
  timeZone: TimeZone
  workingHours?: {
    start: string // HH:mm format
    end: string // HH:mm format
  }
}

export interface TimeSlot {
  start: string
  end: string
}

export interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export interface Feature {
  name: string
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
} 