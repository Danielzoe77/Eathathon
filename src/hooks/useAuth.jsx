import { useContext } from "react"
import { AuthContent } from "../contexts/AuthProvider"


const useAuth = () => {
    const auth = useContext(AuthContent)

  return auth
}

export default useAuth
