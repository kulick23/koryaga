import { useEffect } from "react"

import HomePage from "@/pages/HomePage"
import { useAppDispatch } from "@/hooks/store"
import { fetchCatalog } from "@/store/slices/catalogSlice"

export function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCatalog())
  }, [dispatch])

  return (
    <div className="font-sans antialiased">
      <HomePage />
    </div>
  )
}
