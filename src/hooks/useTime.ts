import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'

export function useTime(updateInterval = 1000) {
  const [currentTime, setCurrentTime] = useState(DateTime.now())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.now())
    }, updateInterval)

    return () => clearInterval(timer)
  }, [updateInterval])

  return currentTime
} 