import {useQueryClient} from "@tanstack/react-query";
import {User} from "./types.ts";
import {sleep} from "./sleep.ts";
import {Link} from "react-router-dom";
import {useUsers} from "./hooks/useUsers.ts";

export function Posts() {
  const queryClient = useQueryClient();

  const { data } = useUsers()

  function handleMouseEnter() {
    queryClient.prefetchQuery({
      queryKey: ['users'],
      queryFn: async (): Promise<User[]> => {
        await sleep(2000);
        const response = await fetch('http://localhost:3000/users');
        return response.json();
      }
    })
  }

  return (
    <>
      <h1>Posts</h1>

      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>

      <button type="button" className="bg-fuchsia-900 px-4 py-2 rounded-md" onMouseEnter={() => handleMouseEnter()}>
        <Link to="/">Retornar para usuários</Link>
      </button>
    </>
  )
}
