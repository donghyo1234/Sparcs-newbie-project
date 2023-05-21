import { useQuery } from "@tanstack/react-query"
import { axios } from "../utils/axios"
import { getUserName } from "../utils/username"

const loggedOutObj = {
  loggedIn: false
}

export const useUser = () => useQuery(["user"], async () => {
  const username = getUserName()
  if (username) {
    try {
      const res = await axios.get("username")
      return res.data
    } catch {
      return loggedOutObj
    }
  } else {
    return loggedOutObj
  }
}, { refetchInterval: 5000 })