import {useQuery} from "@tanstack/react-query";
import {User} from "../types.ts";
import {sleep} from "../sleep.ts";

export function useUsers() {
  return useQuery({
    enabled: false,
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      await sleep(2000);
      const response = await fetch('http://localhost:3000/users');
      return response.json();
    }
  })
}
