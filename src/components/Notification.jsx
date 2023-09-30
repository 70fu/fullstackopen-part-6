import { useDispatch, useSelector } from 'react-redux'
import { checkTime } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  setTimeout(() => {
    dispatch(checkTime())
  },notification.showUntil-Date.now()+10);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if(notification.text){
    return (
      <div style={style}>
        {notification.text}
      </div>
    )
  }
  else {
    return (<></>)
  }
}

export default Notification