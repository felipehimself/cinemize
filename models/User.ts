import { Schema, Model } from 'mongoose';
import createModel from '../utils/createModel';
import { User } from '../ts/types/user';

type UserModel = Model<User>;

const userSchema = new Schema<User, UserModel>(
  {
    name: { type: String, required: true },
    user: { type: String, required: false, default: '' },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default createModel<User, UserModel>('User', userSchema);
