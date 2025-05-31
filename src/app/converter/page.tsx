import { TimeZoneConverter } from '@/components/TimeZoneConverter'

export default function ConverterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Time Zone Converter
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Compare times between multiple cities with our intuitive visual interface
          </p>
        </div>
        <div className="mt-12">
          <TimeZoneConverter />
        </div>
      </div>
    </div>
  )
} 