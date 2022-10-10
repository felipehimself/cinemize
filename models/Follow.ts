import { Schema, Model } from 'mongoose';
import { Follow } from '../ts/types/follow';
import createModel from '../utils/createModel';

type FollowModel = Model<Follow>;

const followSchema = new Schema<Follow, FollowModel>(
  {
    userId: { type: String, required:true },
    following: [
      {
        userId: { type: String, required: false },
      },
    ],
    followers: [
      {
        userId: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default createModel<Follow, FollowModel>('Follow', followSchema);
