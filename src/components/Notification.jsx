import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationValue();

  if (!notification.text) return null

  return (
    <div style={style}>
      {notification.text}
    </div>
  )
}

export default Notification
