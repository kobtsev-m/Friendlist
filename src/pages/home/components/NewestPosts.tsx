import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { PostSkeleton } from '../../../components/organisms/PostSkeleton';
import { Post } from '../../../types/model.types';
import { POSTS } from '../../../assets/mock/posts.mock';
import { PostItem } from '../../../components/organisms/PostItem';

export const NewestPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | undefined>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      setPosts(POSTS);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Grid container spacing={3}>
      {(posts ?? [...Array(7)]).map((post, index) => (
        <Grid key={`postItem${index}`} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
          {post ? <PostItem index={index} post={post} /> : <PostSkeleton />}
        </Grid>
      ))}
    </Grid>
  );
};
