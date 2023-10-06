import { createContext, useReducer, useContext } from 'react'

const initialNotification = {
  text:'',
  showUntil:Date.now()
};

const notificationReducer = (state, action) => {
  switch(action.type){
  case 'SET':{
    return {
      text:action.payload.text,
      showUntil: Date.now() + action.payload.duration
    }
  }
  case 'CHECK_TIME':{
    if(Date.now()>state.showUntil){
      return { text:'', showUntil:initialNotification.showUntil }
    }
    return state;
  }
  default:
    return state;
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const stateAndDispatch = useContext(NotificationContext);
  return stateAndDispatch[0];
}

export const useNotificationDispatch = () => {
  const stateAndDispatch = useContext(NotificationContext);
  return stateAndDispatch[1];
}

export default NotificationContext