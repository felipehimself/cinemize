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
        userId: { type: String, required:true },
        message: { type: String, required:true },
        redirect: { type: String, required:true },
        notificationId: { type: String, required: true },
        itemToRemoveId: {type:String},
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
