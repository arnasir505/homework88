import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  addComment,
  fetchComments,
  fetchFullPost,
} from '../../store/fullPost/fullPostThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectFullPost,
  selectFullPostCommentSubmitError,
  selectFullPostCommentSubmitLoading,
  selectFullPostComments,
  selectFullPostError,
  selectFullPostLoading,
} from '../../store/fullPost/fullPostSlice';
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { apiUrl } from '../../constants';
import { selectUser } from '../../store/users/usersSlice';
import Progress from '../../components/Progress/Progress';
import NotFound from '../../components/NotFound/NotFound';

const FullPostPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectFullPost);
  const loading = useAppSelector(selectFullPostLoading);
  const error = useAppSelector(selectFullPostError);
  const addCommentLoading = useAppSelector(selectFullPostCommentSubmitLoading);
  const addCommentError = useAppSelector(selectFullPostCommentSubmitError);
  const user = useAppSelector(selectUser);
  const comments = useAppSelector(selectFullPostComments);

  const [comment, setComment] = useState('');

  const onCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const onCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addComment(comment)).unwrap();
    setComment('');
    await dispatch(fetchComments());
  };

  const getFullPost = async () => {
    if (params.id) {
      await dispatch(fetchFullPost(params.id)).unwrap();
      await dispatch(fetchComments());
    }
  };

  useEffect(() => {
    void getFullPost();
  }, [params.id]);

  let content = <Progress />;

  if (!loading) {
    content = (
      <>
        <Typography variant='h3'>{post.title}</Typography>
        <Typography
          color={'text.secondary'}
          sx={{ mt: 1, mb: 3 }}
          fontStyle='oblique'
        >
          At {dayjs(post.datetime).format('DD.MM.YYYY HH:mm')} by{' '}
          {post.author.username}
        </Typography>
        {post.image ? (
          <img
            src={apiUrl + '/' + post.image}
            alt='img'
            style={{ maxWidth: '450px', height: 'auto' }}
          />
        ) : null}
        <Typography variant='body1' sx={{ mt: 1, fontSize: '1.25rem' }}>
          {post.description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {comments.map((comment) => (
          <Card key={comment._id} elevation={0} sx={{ mb: 1 }}>
            <Typography variant='body1' sx={{ fontWeight: 'bold', mr: 1 }}>
              {comment.author.username}
            </Typography>
            <Typography
              variant='body1'
              color='gray'
              fontSize='0.9rem'
              fontStyle='oblique'
            >
              {dayjs(comment.datetime).format('DD.MM.YYYY HH:mm')}
            </Typography>
            <Typography variant='body1'>{comment.comment}</Typography>
          </Card>
        ))}
        {user && (
          <>
            <Typography variant='h5' sx={{ mt: 2, mb: 2 }}>
              Add comment
            </Typography>
            <Box component='form' onSubmit={onCommentSubmit}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    color='warning'
                    type='text'
                    name='body'
                    label='Comment'
                    rows={2}
                    value={comment}
                    onChange={onCommentChange}
                    helperText={addCommentError?.errors['comment'].message}
                    error={Boolean(addCommentError)}
                  />
                </Grid>
                <Grid item>
                  <LoadingButton
                    type='submit'
                    variant='contained'
                    color='warning'
                    loading={addCommentLoading}
                  >
                    <span>Send</span>
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </>
    );
  }

  return <Container sx={{ py: 3 }}>{error ? <NotFound /> : content}</Container>;
};

export default FullPostPage;
