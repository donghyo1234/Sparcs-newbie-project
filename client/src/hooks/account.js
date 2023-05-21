import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

let account = null
export const useAccount = () => useQuery(["account"], () => account)

export const setAccount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (_account) => { 
      account = _account
      return account
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["account"], data)
    }
})}