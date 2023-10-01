import { createSlice } from '@reduxjs/toolkit'

const NOTIFICATION_TIME = 3;

const initialNotification = {
  text:'',
  showUntil:Date.now()
};

const notificationSlice = createSlice({
  name:'notification',
  initialState:initialNotification,
  reducers:{
    setNotification(state, action){
      state.text = action.payload.text;
      state.showUntil = Date.now() + action.payload.duration;
    },
    checkTime(state,action){
      if(Date.now() > state.showUntil){
        state.text = '';
      }
    }
  }
})

export const { setNotification, checkTime } = notificationSlice.actions

export function showNotification(text, seconds=NOTIFICATION_TIME){
  return (dispatch) => {
    const millis = seconds * 1000;
    dispatch(setNotification({ text,duration: millis }));
    setTimeout(() => {
      dispatch(checkTime())
    },millis+10);
  }
}

export default notificationSlice.reducer