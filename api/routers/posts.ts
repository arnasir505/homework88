import express from 'express';
import Post from '../models/Post';

const postsRouter = express.Router();

postsRouter.post('/', async (req, res, next) => {
  return res.send('test');
})

postsRouter.get('/', async (_req, res, next) => {
  try {
    const posts = await Post.find();

    return res.send(posts);
  } catch (error) {
    next(error);
  }
});
