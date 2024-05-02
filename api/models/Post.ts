import { Schema, Types, model } from 'mongoose';
import User from './User';

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String || null,
    image: String || null,
    datetime: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (id: Types.ObjectId) => User.findById(id),
        message: 'User does not exist.',
      },
    },
  },
  { versionKey: false }
);

const Post = model('Post', PostSchema);

export default Post;
