import {useUsers} from "./hooks/useUsers.ts";
import {useCreateUser} from "./hooks/useCreateUser.ts";
import {useQueryClient} from "@tanstack/react-query";

export function Users() {
  const queryClient = useQueryClient();
  const { data, refetch, isFetching, error } = useUsers()

  const { mutateAsync, isPending } = useCreateUser()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const elements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement,
      email: HTMLInputElement
    }

    await mutateAsync({ name: elements.name.value, email: elements.email.value })
    elements.name.value = ''
    elements.email.value = ''
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }

  return (
    <div className="flex gap-3 flex-col w-1/3">
      <form className="flex flex-col gap-2 mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          className="px-4 py-2 rounded-md text-zinc-700"
          name="name"
        />
        <input
          type="text"
          placeholder="E-mail"
          className="px-4 py-2 rounded-md text-zinc-700"
          name="email"
        />
        <button type="submit" className="bg-purple-900 px-4 py-2 rounded-md">{isPending ? 'Cadastrando...' : 'Cadastrar'}</button>
      </form>

      <button type="button" className="bg-purple-400 px-4 py-2 rounded-md" onClick={() => refetch()}>Listar usuários</button>
      {isFetching && (
        <span className="text-center">Carregando...</span>
      )}
      {error && <span className="text-red-500">{error.message}</span>}
      {!isFetching && data?.map((user) => (
        <div key={user.id} className="rounded-md bg-zinc-800 py-2 px-4">
          <strong className="block">{user.name}</strong>
          <small>{user.email}</small>
        </div>
      ))}
    </div>
  )
}
