import { DateTime } from 'luxon'
import { Participant, TimeZone } from '@/types'

export function getTimeZoneOffset(timeZone: string): string {
  return DateTime.now().setZone(timeZone).toFormat('ZZZZ')
}

export function getLocalTime(time: DateTime, timeZone: string): string {
  return time.setZone(timeZone).toFormat('HH:mm')
}

export function formatTimeSlot(start: DateTime, end: DateTime, timeZone: string): string {
  return `${start.setZone(timeZone).toFormat('HH:mm')} - ${end.setZone(timeZone).toFormat('HH:mm')}`
}

export function findOverlappingTimeSlots(
  participants: Participant[],
  duration: number,
  date: DateTime = DateTime.now()
): { start: DateTime; end: DateTime }[] {
  // Convert all working hours to UTC for comparison
  const utcWorkingHours = participants.map(participant => {
    const { workingHours } = participant
    if (!workingHours) return null

    const start = DateTime.fromFormat(workingHours.start, 'HH:mm', { zone: participant.timeZone.id })
    const end = DateTime.fromFormat(workingHours.end, 'HH:mm', { zone: participant.timeZone.id })

    return {
      start: start.toUTC(),
      end: end.toUTC(),
    }
  }).filter(Boolean)

  if (utcWorkingHours.length === 0) return []

  // Find the latest start time and earliest end time
  const latestStart = DateTime.max(...utcWorkingHours.map(h => h!.start))
  const earliestEnd = DateTime.min(...utcWorkingHours.map(h => h!.end))

  // If there's no overlap, return empty array
  if (latestStart >= earliestEnd) return []

  // Generate time slots
  const slots: { start: DateTime; end: DateTime }[] = []
  let currentTime = latestStart

  while (currentTime.plus({ minutes: duration }) <= earliestEnd) {
    slots.push({
      start: currentTime,
      end: currentTime.plus({ minutes: duration }),
    })
    currentTime = currentTime.plus({ minutes: 30 }) // 30-minute intervals
  }

  return slots
}

export function getAllTimeZones(): TimeZone[] {
  return DateTime.local().zone.names.map(name => {
    const dt = DateTime.now().setZone(name)
    return {
      id: name,
      name: name.replace(/_/g, ' '),
      offset: dt.toFormat('ZZZZ'),
    }
  })
} 