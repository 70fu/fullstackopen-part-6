import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
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
    appendAnecdote(state, action){
      state.push(action.payload);
    },
    setAnecdotes(state, action){
      return action.payload;
    }
  }
});


export const { voteFor, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(anecdote));
  }
}

export default anecdoteSlice.reducer;