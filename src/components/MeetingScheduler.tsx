import { useState } from 'react'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { TimeZoneSearch } from './TimeZoneSearch'
import { Participant } from '@/types'
import { findOverlappingTimeSlots, formatTimeSlot } from '@/utils/time'
import { DateTime } from 'luxon'
import { MEETING_DURATIONS, DEFAULT_WORKING_HOURS } from '@/constants'

interface TimeSlot {
  start: string
  end: string
}

export function MeetingScheduler() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [meetingDuration, setMeetingDuration] = useState(60)
  const [showTimeZoneSearch, setShowTimeZoneSearch] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [selectedDate, setSelectedDate] = useState(DateTime.now().toFormat('yyyy-MM-dd'))

  const addParticipant = () => {
    const newParticipant: Participant = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      timeZone: {
        id: 'UTC',
        name: 'UTC',
        offset: '+00:00',
      },
      workingHours: {
        start: '09:00',
        end: '17:00',
      },
    }
    setParticipants([...participants, newParticipant])
    setSelectedParticipant(newParticipant.id)
    setShowTimeZoneSearch(true)
  }

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id))
    setAvailableSlots([])
  }

  const handleTimeZoneSelect = (timeZone: { id: string; name: string; offset: string }) => {
    if (selectedParticipant) {
      setParticipants(participants.map(p =>
        p.id === selectedParticipant
          ? { ...p, timeZone }
          : p
      ))
      setShowTimeZoneSearch(false)
      setSelectedParticipant(null)
    }
  }

  const updateParticipantName = (id: string, name: string) => {
    setParticipants(participants.map(p =>
      p.id === id
        ? { ...p, name }
        : p
    ))
  }

  const updateWorkingHours = (id: string, start: string, end: string) => {
    setParticipants(participants.map(p =>
      p.id === id
        ? { ...p, workingHours: { start, end } }
        : p
    ))
    setAvailableSlots([])
  }

  const findTimeSlots = () => {
    const date = DateTime.fromFormat(selectedDate, 'yyyy-MM-dd')
    const slots = findOverlappingTimeSlots(participants, meetingDuration, date)
    setAvailableSlots(slots.map(slot => ({
      start: slot.start.toFormat('HH:mm'),
      end: slot.end.toFormat('HH:mm'),
    })))
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="space-y-6">
        {/* Meeting duration and date */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Meeting Duration (minutes)
            </label>
            <select
              id="duration"
              value={meetingDuration}
              onChange={(e) => setMeetingDuration(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Meeting Date
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Participants list */}
        <div className="space-y-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={participant.name}
                  onChange={(e) => updateParticipantName(participant.id, e.target.value)}
                  placeholder="Participant name"
                  className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {participant.timeZone.name} ({participant.timeZone.offset})
                  </span>
                  <button
                    onClick={() => {
                      setSelectedParticipant(participant.id)
                      setShowTimeZoneSearch(true)
                    }}
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Change
                  </button>
                  <button
                    onClick={() => removeParticipant(participant.id)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Working Hours Start
                  </label>
                  <input
                    type="time"
                    value={participant.workingHours?.start}
                    onChange={(e) => updateWorkingHours(participant.id, e.target.value, participant.workingHours?.end || '17:00')}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Working Hours End
                  </label>
                  <input
                    type="time"
                    value={participant.workingHours?.end}
                    onChange={(e) => updateWorkingHours(participant.id, participant.workingHours?.start || '09:00', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Time zone search */}
        {showTimeZoneSearch && (
          <div className="mt-4">
            <TimeZoneSearch onSelect={handleTimeZoneSelect} />
          </div>
        )}

        {/* Add participant button */}
        {!showTimeZoneSearch && (
          <button
            onClick={addParticipant}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/50 dark:hover:bg-blue-900 dark:text-blue-400 rounded-lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Participant
          </button>
        )}

        {/* Find time slots button */}
        {participants.length > 0 && !showTimeZoneSearch && (
          <button
            onClick={findTimeSlots}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg"
          >
            Find Available Time Slots
          </button>
        )}

        {/* Available time slots */}
        {availableSlots.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Available Time Slots
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className="p-3 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-lg text-center"
                >
                  {slot.start} - {slot.end}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 