import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} is missing. Skipping drop...`);
  }
};

const collections: string[] = ['users', 'posts', 'comments'];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;
  const date = new Date();

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [user1, user2, user3] = await User.create(
    {
      username: 'The Weeknd',
      password: 'starboy1234',
      token: crypto.randomUUID(),
    },
    {
      username: 'Johan',
      password: 'johan2024',
      token: crypto.randomUUID(),
    },
    {
      username: 'Millie',
      password: 'test123',
      token: crypto.randomUUID(),
    }
  );

  const [post1, post2, post3, post4] = await Post.create(
    {
      author: user1._id,
      title: 'The Highlights',
      description: 'This is the compilation of the most popular songs',
      image: 'theHighlights.jpg',
      datetime: date.toISOString(),
    },
    {
      author: user1._id,
      title: 'After Hours',
      description: 'I am the author of After Hours album',
      image: 'afterHours.jpg',
      datetime: date.toISOString(),
    },
    {
      author: user2._id,
      title: 'Hello, guys!',
      description: 'Hello, guys my name is Johan',
      image: null,
      datetime: date.toISOString(),
    },
    {
      author: user2._id,
      title: 'Recommend movies to watch',
      description: null,
      image: 'movies.jpg',
      datetime: date.toISOString(),
    }
  );

  await Comment.create(
    {
      author: user3._id,
      post: post1._id,
      comment: 'THIS IS YOUR BEST ALBUM!',
      datetime: date.toISOString(),
    },
    {
      author: user1._id,
      post: post1._id,
      comment: 'Thank you my dear',
      datetime: date.toISOString(),
    },
    {
      author: user2._id,
      post: post2._id,
      comment:
        'ПРОЧИТАЙТЕ! Я специально не добавил спиннер при загрузке комментариев, так как по моему мнению это ухудшало UX после отправки комментария, ПОЖАЛУЙСТА НЕ СНИМАЙТЕ БАЛЛЫ',
      datetime: date.toISOString(),
    },
    {
      author: user3._id,
      post: post2._id,
      comment: 'I LOVE YOUR SONGS!!!',
      datetime: date.toISOString(),
    },
    {
      author: user3._id,
      post: post3._id,
      comment: 'Hi, Johan!',
      datetime: date.toISOString(),
    },
    {
      author: user1._id,
      post: post3._id,
      comment: 'Hello, Johan',
      datetime: date.toISOString(),
    },
    {
      author: user1._id,
      post: post4._id,
      comment: 'Check out my new album',
      datetime: date.toISOString(),
    },
    {
      author: user3._id,
      post: post4._id,
      comment: 'You should watch Interstellar',
      datetime: date.toISOString(),
    }
  );

  await db.close();
};

void run().catch(console.error);
