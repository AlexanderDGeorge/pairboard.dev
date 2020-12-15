import { database } from '../firebase';
import { NotificationSchema } from './schema';

export async function sendNotification(notification: NotificationSchema) {
    const { to, from, type, content } = notification;
    const notificationRef = database().ref(`/notifications/${to}`);
    await notificationRef.set({
        type,
        content,
        from,
    });
}
