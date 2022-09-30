import { Schema, Model } from 'mongoose';
import { Post } from '../ts/types/post';
import createModel from '../utils/createModel';

type PostModel = Model<Post>;

const postSchema = new Schema<Post, PostModel>(
  {
    uuid: { type: String, required: true },
    type: { type: String, required: true },
    userName: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    whereToWatch: [{ type: String, required: true }],
    genre: [{ type: String, required: true }],
    likedBy: [
      {
        userName: { type: String , required:false},
        name: { type: String, required:false },
        isVerified: { type: Boolean, required:false },
      },
    ],
    favoritedBy: [
      {
        userName: { type: String },
        name: { type: String },
        isVerified: { type: Boolean },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default createModel<Post, PostModel>('Post', postSchema);
