import { useEffect } from "react"

import HomePage from "@/pages/HomePage"
import AdminPage from "@/pages/AdminPage"
import { useAppDispatch } from "@/hooks/store"
import { fetchCatalog } from "@/store/slices/catalogSlice"

export function App() {
  const dispatch = useAppDispatch()
  const isAdmin = window.location.pathname.startsWith("/admin")

  useEffect(() => {
    if (!isAdmin) dispatch(fetchCatalog())
  }, [dispatch, isAdmin])

  if (isAdmin) return <AdminPage />

  return (
    <div className="font-sans antialiased">
      <HomePage />
    </div>
  )
}
