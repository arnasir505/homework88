import React from 'react';
import { Container, Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../components/FileInput/FileInput';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearForm,
  selectNewPost,
  selectNewPostSubmitLoading,
  updateDescription,
  updateImage,
  updateTitle,
} from '../../store/newPost/newPostSlice';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const newPost = useAppSelector(selectNewPost);
  const loading = useAppSelector(selectNewPostSubmitLoading);

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) {
      const localImageUrl = window.URL.createObjectURL(files[0]);
      dispatch(updateImage(localImageUrl));
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // await dispatch(createNewPost(newPost));
    dispatch(clearForm());
    navigate('/');
  };

  return (
    <Container sx={{ py: 3 }} maxWidth='md'>
      <Typography variant='h4' sx={{ mb: 2 }}>
        Add new post
      </Typography>
      <form onSubmit={onFormSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              type='text'
              name='title'
              label='Title'
              color='warning'
              required
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
      </form>
    </Container>
  );
};

export default NewPost;
