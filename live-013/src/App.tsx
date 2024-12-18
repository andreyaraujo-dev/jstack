import { useQuery, QueryClient } from "@tanstack/react-query";

interface IUser {
  id: number;
  email: string;
  name: string;
}

const queryClient = new QueryClient();

export function App() {
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: async (): Promise<IUser[]> => {
    const response = await fetch('http://localhost:3000/users');
    return response.json();
  }
}, queryClient)
  return (
    <div>
      {data?.map((user) => (
        <div key={user.id} >
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  )
}
