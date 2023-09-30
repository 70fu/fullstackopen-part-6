import { createSlice } from '@reduxjs/toolkit'

const NOTIFICATION_TIME = 5000;

const initialNotification = {
  text:'',
  showUntil:Date.now()
};

const notificationSlice = createSlice({
  name:'notification',
  initialState:initialNotification,
  reducers:{
    showNotification(state, action){
      state.text = action.payload;
      state.showUntil = Date.now() + NOTIFICATION_TIME;
    },
    checkTime(state,action){
      if(Date.now() > state.showUntil){
        state.text = '';
      }
    }
  }
})

export const { showNotification, checkTime } = notificationSlice.actions
export default notificationSlice.reducer