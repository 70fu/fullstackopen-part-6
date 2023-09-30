import { voteFor } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sorted = anecdotes.toSorted((a,b) => b.votes-a.votes)
    if(filter){
      return sorted.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()));
    }
    return sorted;
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteFor(anecdote.id));
    dispatch(showNotification(`Voted for '${anecdote.content}'`))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
          has {anecdote.votes} votes
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList;