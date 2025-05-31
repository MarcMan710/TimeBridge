import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { TimeZoneSearch } from './TimeZoneSearch'
import { TimeZoneDisplay } from './TimeZoneDisplay'
import { useTime } from '@/hooks/useTime'
import { TimeZone } from '@/types/timezone'

export function TimeZoneConverter() {
  const [timeZones, setTimeZones] = useState<TimeZone[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const currentTime = useTime()

  const handleTimeZoneSelect = (timeZone: TimeZone) => {
    setTimeZones([...timeZones, timeZone])
    setShowSearch(false)
  }

  const removeTimeZone = (id: string) => {
    setTimeZones(timeZones.filter(tz => tz.id !== id))
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="space-y-6">
        {/* Time zone list */}
        <div className="space-y-4">
          {timeZones.map((timeZone) => (
            <TimeZoneDisplay
              key={timeZone.id}
              timeZone={timeZone}
              currentTime={currentTime.setZone(timeZone.id).toFormat('HH:mm:ss')}
              onRemove={removeTimeZone}
            />
          ))}
        </div>

        {/* Time zone search */}
        {showSearch ? (
          <div className="mt-4">
            <TimeZoneSearch onSelect={handleTimeZoneSelect} />
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/50 dark:hover:bg-blue-900 dark:text-blue-400 rounded-lg"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Time Zone
          </button>
        )}
      </div>
    </div>
  )
} 