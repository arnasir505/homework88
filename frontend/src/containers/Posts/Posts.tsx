import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts } from '../../store/posts/postsThunks';
import { selectPosts, selectPostsLoading } from '../../store/posts/postsSlice';
import { Link } from 'react-router-dom';
import Progress from '../../components/Progress/Progress';
import { apiUrl } from '../../constants';
import textPlaceholder from '../../assets/chat-balloon.png';
import dayjs from 'dayjs';

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);

  const getPosts = async () => {
    await dispatch(fetchPosts());
  };

  useEffect(() => {
    void getPosts();
  }, []);

  let content = <Progress />;

  if (posts.length > 0 && !loading) {
    content = (
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post._id}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component={'img'}
                image={post.image ? apiUrl + '/' + post.image : textPlaceholder}
                alt='img'
                sx={{ maxWidth: 160, maxHeight: 160, objectFit: 'contain' }}
              />
              <CardContent>
                <Typography variant='body1' color='gray'>
                  {dayjs(post.datetime).format('DD.MM.YYYY HH:mm')}
                </Typography>
                <Link to={`/posts/${post._id}`} style={{ color: '#ed6c02' }}>
                  <Typography variant='h6'>{post.title}</Typography>
                </Link>
                <Typography
                  variant='body1'
                  fontStyle='oblique'
                  fontWeight='bold'
                  sx={{ mt: '5px' }}
                >
                  {post.author.username}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  } else if (posts.length === 0 && !loading) {
    content = (
      <Typography variant='h5' textAlign={'center'} mt={3}>
        No posts yet.
      </Typography>
    );
  }
  return (
    <Container sx={{ py: 5 }} maxWidth='md'>
      {content}
    </Container>
  );
};

export default Posts;
