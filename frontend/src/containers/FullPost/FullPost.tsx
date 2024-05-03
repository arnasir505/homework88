import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFullPost } from '../../store/fullPost/fullPostThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFullPost, selectFullPostError, selectFullPostLoading } from '../../store/fullPost/fullPostSlice';
import { Box, Container, Divider, Grid, TextField, Typography } from '@mui/material';
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
  const user = useAppSelector(selectUser);

  const [comment, setComment] = useState('');

  const onCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const onCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getFullPost = async () => {
    if (params.id) {
      await dispatch(fetchFullPost(params.id)).unwrap();
    }
  };

  useEffect(() => {
    void getFullPost();
  }, [params.id]);

  let content = <Progress/>;

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
        {/* <Typography variant='h4'>
        Comments
      </Typography> */}
        {/* {contentComments} */}
        {user && (
          <>
            <Typography variant='h5' sx={{ mt: 2, mb: 1 }}>
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
                    required
                    rows={2}
                    value={comment}
                    onChange={onCommentChange}
                  />
                </Grid>
                <Grid item>
                  <LoadingButton
                    type='submit'
                    variant='contained'
                    color='warning'
                    loading={false}
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

  return (
    <Container sx={{ py: 3 }}>
      {error ? <NotFound/> : content}
    </Container>
  );
};

export default FullPostPage;
