import { XMarkIcon } from '@heroicons/react/24/outline'
import { TimeZoneDisplayProps } from '@/types/timezone'

export function TimeZoneDisplay({ timeZone, currentTime, onRemove }: TimeZoneDisplayProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {timeZone.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {timeZone.offset}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-xl font-mono text-gray-900 dark:text-white">
          {currentTime}
        </div>
        <button
          onClick={() => onRemove(timeZone.id)}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
} 