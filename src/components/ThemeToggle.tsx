import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  )
} 