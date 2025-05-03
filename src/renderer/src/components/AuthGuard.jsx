import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function AuthGuard({ children }) {
  const navigate = useNavigate()
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [navigate])

  return children
}