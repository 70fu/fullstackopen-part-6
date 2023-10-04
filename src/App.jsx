import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import { vote } from './requests'

const App = () => {

  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn:vote,
    onSuccess:(voted) => {
      queryClient.setQueryData(['anecdotes'], (oldData) => {
        return oldData.map((a) => a.id===voted.id?voted:a);
      })
    }
  })
  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1,
      refetchOnWindowFocus: false
    }
  )

  if ( result.isLoading ) {
    return <div>loading anecdotes...</div>
  }

  if(result.isError){
    return <div>An error occured while loading anecdotes: {result.error.message}</div>
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
