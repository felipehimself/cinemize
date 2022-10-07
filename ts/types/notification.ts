export type Notification = {
  userId: string;
  hasNotification: boolean;
  notifications: NotificationsArr[];
};

type NotificationsArr = {
  userId: string;
  message: string;
  redirect: string;
  userName?:string;
  isRead: boolean;
  _id:string;
  notificationId: string;
};
