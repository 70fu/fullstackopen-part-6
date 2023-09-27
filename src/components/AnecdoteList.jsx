import { voteFor } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const sorted = anecdotes.toSorted((a,b) => b.votes-a.votes)
    console.log(sorted);
    if(filter){
      return sorted.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()));
    }
    return sorted;
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id));
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
          has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList;