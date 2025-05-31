export interface TimeZone {
  id: string
  name: string
  offset: string
}

export interface TimeZoneSearchProps {
  onSelect: (timeZone: TimeZone) => void
}

export interface TimeZoneDisplayProps {
  timeZone: TimeZone
  currentTime: string
  onRemove: (id: string) => void
} 