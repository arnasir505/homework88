import { Schema, Types, model } from 'mongoose';
import User from './User';
import Post from './Post';

const CommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (id: Types.ObjectId) => User.findById(id),
        message: 'User does not exist.',
      },
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      validate: {
        validator: async (id: Types.ObjectId) => Post.findById(id),
        message: 'Post does not exist.',
      },
    },
    comment: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Comment = model('Comment', CommentSchema);

export default Comment;
