const NOTIFICATION_TIME=5000;

export function showNotification(dispatch, text, millis=NOTIFICATION_TIME){
  dispatch({ type:'SET',payload:{ text,duration: millis } });
  setTimeout(() => {
    dispatch({ type:'CHECK_TIME' });
  },millis+10);
}