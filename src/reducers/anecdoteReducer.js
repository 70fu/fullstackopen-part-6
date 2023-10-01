import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState:[],
  reducers:{
    update(state,action){
      return state.map((a) => a.id===action.payload.id?action.payload:a);
    },
    appendAnecdote(state, action){
      state.push(action.payload);
    },
    setAnecdotes(state, action){
      return action.payload;
    }
  }
});


export const { update, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

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

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const updated = await anecdoteService.vote(anecdote);
    dispatch(update(updated));
  }
}

export default anecdoteSlice.reducer;