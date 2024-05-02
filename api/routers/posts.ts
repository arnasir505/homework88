import express from 'express';
import Post from '../models/Post';
import auth, { RequestWithUser } from '../middleware/auth';
import { PostMutation } from '../types';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

const postsRouter = express.Router();

postsRouter.post(
  '/',
  auth,
  imagesUpload.single('image'),
  async (req: RequestWithUser, res, next) => {
    try {
      const date = new Date();

      if (!req.file && !req.body.description) {
        return res.status(400).send({error: 'Fields image or description are required.'})
      };
      
      const postData: PostMutation = {
        title: req.body.title,
        description: req.body.description || null,
        image: req.file ? req.file.filename : null,
        datetime: date.toISOString(),
        author: req.user?.id,
      };

      const post = new Post(postData);
      await post.save();
      return res.send(post);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(error);
      }
      next(error);
    }
  }
);

postsRouter.get('/', async (_req, res, next) => {
  try {
    const posts = await Post.find();

    return res.send(posts);
  } catch (error) {
    next(error);
  }
});

export default postsRouter;
