import React, { useEffect } from 'react';
import FileInput from '../../components/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearForm,
  selectNewPost,
  selectNewPostError,
  selectNewPostSubmitLoading,
  updateDescription,
  updateImage,
  updateTitle,
} from '../../store/newPost/newPostSlice';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { addNewPost } from '../../store/newPost/newPostThunks';
import { selectUser } from '../../store/users/usersSlice';
import {
  Alert,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const newPost = useAppSelector(selectNewPost);
  const loading = useAppSelector(selectNewPostSubmitLoading);
  const error = useAppSelector(selectNewPostError);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      const localImageUrl = window.URL.createObjectURL(files[0]);
      dispatch(updateImage(localImageUrl));
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addNewPost()).unwrap();
    dispatch(clearForm());
    navigate('/');
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <Container sx={{ py: 3 }} maxWidth='md'>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Add new post
      </Typography>
      {error && (
        <Alert
          severity='error'
          variant='outlined'
          sx={{ my: 2, width: '100%' }}
        >
          {error.error}
        </Alert>
      )}
      <Box component='form' onSubmit={onFormSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              type='text'
              name='title'
              label='Title'
              color='warning'
              value={newPost.title}
              onChange={(e) => dispatch(updateTitle(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              type='text'
              name='description'
              label='Content'
              color='warning'
              rows={5}
              value={newPost.description}
              onChange={(e) => dispatch(updateDescription(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <FileInput
              onChange={fileInputChangeHandler}
              name='image'
              label='Image'
            />
          </Grid>
          <Grid item>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={loading}
              color='warning'
            >
              <span>Save</span>
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NewPost;
