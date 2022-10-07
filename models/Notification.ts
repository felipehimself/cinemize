import { Schema, Model } from 'mongoose';
import createModel from '../utils/createModel';
import { Notification } from '../ts/types/notification';

type NotificationModel = Model<Notification>;

const notificationSchema = new Schema<Notification, NotificationModel>(
  {
    userId: { type: String, required: true },
    hasNotification: { type: Boolean, default: false },
    notifications: [
      {
        userId: { type: String },
        message: { type: String },
        redirect: { type: String },
        notificationId: { type: String, required: true },
        isRead: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default createModel<Notification, NotificationModel>(
  'Notifications',
  notificationSchema
);
