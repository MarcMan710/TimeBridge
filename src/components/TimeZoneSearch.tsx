import { useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { TimeZone } from '@/types'
import { getAllTimeZones } from '@/utils/time'

interface TimeZoneSearchProps {
  onSelect: (timeZone: TimeZone) => void
}

export function TimeZoneSearch({ onSelect }: TimeZoneSearchProps) {
  const [query, setQuery] = useState('')
  const [timeZones, setTimeZones] = useState<TimeZone[]>([])

  useEffect(() => {
    setTimeZones(getAllTimeZones())
  }, [])

  const filteredTimeZones = query === ''
    ? timeZones.slice(0, 5)
    : timeZones.filter((timeZone) =>
        timeZone.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)

  return (
    <Combobox as="div" onChange={(timeZone: TimeZone) => onSelect(timeZone)}>
      <div className="relative">
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            className="h-12 w-full border-0 bg-white dark:bg-gray-800 pl-11 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm rounded-lg"
            placeholder="Search time zones..."
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(timeZone: TimeZone) => timeZone?.name ?? ''}
          />
        </div>

        {filteredTimeZones.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredTimeZones.map((timeZone) => (
              <Combobox.Option
                key={timeZone.id}
                value={timeZone}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-3 pr-9 ${
                    active ? 'bg-blue-600 text-white' : 'text-gray-900 dark:text-white'
                  }`
                }
              >
                <div className="flex items-center">
                  <span className="ml-3 truncate">{timeZone.name}</span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    {timeZone.offset}
                  </span>
                </div>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
} 