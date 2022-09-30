import { Schema, Model } from 'mongoose';
import { Post } from '../ts/types/post';
import createModel from '../utils/createModel';

type PostModel = Model<Post>;

const postSchema = new Schema<Post, PostModel>(
  {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    whereToWatch: [{ type: String, required: true }],
    genre: [{ type: String, required: true }],
    likedBy: [
      {
        userId: { type: String, required: false },
      },
    ],
    favoritedBy: [
      {
        userId: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default createModel<Post, PostModel>('Post', postSchema);
