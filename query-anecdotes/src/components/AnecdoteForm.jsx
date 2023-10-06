import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext';
import { showNotification } from '../notificationActions'


const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const createAnecdoteMutation = useMutation({
    mutationFn:createAnecdote,
    onSuccess: (newAnecdote) => {
      showNotification(notificationDispatch,`Created anecdote '${newAnecdote.content}'`);
      queryClient.setQueryData(['anecdotes'], (oldData) => oldData.concat(newAnecdote))
    },
    onError: (error) => {
      showNotification(notificationDispatch,`Error: '${error.response.data.error}'`);

    }
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes:0 });
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
