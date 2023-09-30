import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => Number((100000 * Math.random()).toFixed(0))

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:initialState,
  reducers:{
    voteFor(state,action){
      console.log('voting for',action.payload);
      const anecdote = state.find((a) => a.id===action.payload);
      if(anecdote){
        anecdote.votes+=1;
      }else{
        console.error('could not vote for anecdote with id',action.payload);
      }
    },
    createAnecdote(state,action){
      const newAnecdote = asObject(action.payload);
      state.push(newAnecdote);
    }
  }
});

export const { voteFor, createAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;