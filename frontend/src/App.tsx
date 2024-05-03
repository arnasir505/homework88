import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import { Typography } from '@mui/material';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import NewPost from './containers/NewPost/NewPost';
import Posts from './containers/Posts/Posts';
import FullPostPage from './containers/FullPost/FullPost';

const App = () => {
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/new-post' element={<NewPost />} />
          <Route path='/posts/:id' element={<FullPostPage />} />
          <Route
            path='*'
            element={
              <Typography variant='h2' sx={{ textAlign: 'center', mt: 2 }}>
                Not Found
              </Typography>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
