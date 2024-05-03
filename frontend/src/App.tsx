import { Route, Routes } from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import NewPost from './containers/NewPost/NewPost';
import Posts from './containers/Posts/Posts';
import FullPostPage from './containers/FullPost/FullPost';
import NotFound from './components/NotFound/NotFound';

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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
