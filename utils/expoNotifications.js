import { Notifications } from 'expo-notifications';

export async function registerForPushNotificationsAsync() {
  // Check if permission is granted
  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  // If permission not granted, ask user for permission
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // If permission still not granted, exit function
  if (finalStatus !== 'granted') {
    return;
  }

  // Get token for device
  const token = await Notifications.getExpoPushTokenAsync();
  
  // Send token to server to save for later use
  // ...

  console.log(token);
}