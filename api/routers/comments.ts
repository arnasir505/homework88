import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import { CommentMutation } from '../types';
import mongoose from 'mongoose';
import Comment from '../models/Comment';

const commentsRouter = express.Router();

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const date = new Date();

    const commentData: CommentMutation = {
      author: req.user?.id,
      post: req.body.post,
      comment: req.body.comment,
      datetime: date.toISOString(),
    };

    const comment = new Comment(commentData);
    await comment.save();
    return res.send(comment);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }
    next(error);
  }
});

commentsRouter.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.query.post }, { post: 0 })
      .populate('author', 'username')
      .sort({ datetime: 'asc' });

    return res.send(comments);
  } catch (error) {
    next(error);
  }
});

export default commentsRouter;
