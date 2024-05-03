import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFullPost } from '../../store/fullPost/fullPostThunks';
import { useAppDispatch } from '../../app/hooks';

const FullPostPage: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const getFullPost = async () => {
    if (params.id) {
      await dispatch(fetchFullPost(params.id));
    }
  }

  useEffect(() => {
    getFullPost();
  }, [])
  return (
    <div>FullPost</div>
  )
}

export default FullPostPage;