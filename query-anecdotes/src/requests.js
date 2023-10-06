import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => axios.get(BASE_URL).then(res => res.data);

export const createAnecdote = (newAnecdote) => axios.post(BASE_URL,newAnecdote).then(res => res.data);

export const vote = (anecdote) => {
  const voted = { ...anecdote, votes:anecdote.votes + 1 };
  return axios.put(`${BASE_URL}/${anecdote.id}`,voted).then(res => res.data);
}