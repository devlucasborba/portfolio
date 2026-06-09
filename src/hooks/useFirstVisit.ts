import { useState, useEffect } from 'react'

const KEY = 'portfolio_visited'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    const visited = sessionStorage.getItem(KEY)
    if (!visited) {
      setIsFirstVisit(true)
      sessionStorage.setItem(KEY, '1')
    }
  }, [])

  return isFirstVisit
}
