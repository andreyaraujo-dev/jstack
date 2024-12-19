import {useMutation} from "@tanstack/react-query";
import {sleep} from "../sleep.ts";

export function useCreateUser() {
  return useMutation({
    mutationFn: async (variables: { name: string, email: string }) => {
      const { name, email } = variables;
      await sleep(2000);
      const response = await fetch('http://localhost:3000/users', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })

      return response.json()
    }
  })
}
