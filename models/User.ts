import { Schema, Model } from 'mongoose';
import { User } from '../ts/types/user';
import createModel from '../utils/createModel';

type UserModel = Model<User>;

const userSchema = new Schema<User, UserModel>(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    location: { type: String, required: false, default: '' },
    isVerified: { type: Boolean, required: false, default: false },
    followers: [{ type: String, required:false, default: [] }],
    following: [{ type: String, required:false, default: [] }],

  },
  {
    timestamps: true,
  }
);

export default createModel<User, UserModel>('User', userSchema);
