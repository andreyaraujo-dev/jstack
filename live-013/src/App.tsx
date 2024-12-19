import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Users} from "./Users.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Posts} from "./Posts.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: false,
      gcTime: 10 * 60 * 1000 // 10 minutes
    }
  }
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        <BrowserRouter>
        <header className="w-full ">
          <ul className="flex gap-4 items-center justify-center my-4">
            <li>
              <Link to="/">Usuários</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </header>

        <Routes>
          <Route path="/" element={<Users/>} />
          <Route path="/posts" element={<Posts/>}/>
        </Routes>
      </BrowserRouter>
      </div>
        <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}
