import React, { useEffect, useState } from 'react';
import { Button, Paper, Stack } from '@mui/material';
import { PostsSvg } from '../../assets/svg/posts.svg';
import { Search } from '../../components/molecules/Search';
import { Post } from '../../types/model.types';
import { Sort } from '../../components/molecules/Sort';
import { Iconify } from '../../components/atoms/Iconify';
import { POSTS } from '../../assets/mock/posts.mock';
import Grid from '@mui/material/Grid';
import { PostItem } from '../../components/organisms/PostItem';
import { PostSkeleton } from '../../components/organisms/PostSkeleton';
import { PageHeader } from '../../components/organisms/PageHeader';

export const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | undefined>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      setPosts(POSTS);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Paper sx={{ p: 5 }}>
      <PageHeader
        title={'Posts'}
        subtitle={'Explore users posts on different themes in different categories'}
        Svg={PostsSvg}
        getBackground={(theme) => theme.palette.grey[900]}
        getTextColor={(theme) => theme.palette.grey[100]}
      />
      <Stack mt={3} direction='row' alignItems='center' justifyContent='space-between'>
        <Search<Post>
          placeholder={'Search post...'}
          onSearch={() => new Promise((r) => setTimeout(() => r(POSTS), 1000))}
          onClick={(id: string) => console.log('open post with id:', id)}
        />
        <Stack direction='row'>
          <Sort
            query={'latest'}
            options={[
              { label: 'Latest', value: 'latest' },
              { label: 'Popular', value: 'popular' }
            ]}
            onSort={(value: string) => console.log('sort post by:', value)}
          />
          <Button variant='outlined' sx={{ height: 39, ml: 2 }}>
            Add new <Iconify icon={'akar-icons:plus'} sx={{ ml: 1 }} />
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={3} mt={1}>
        {(posts ?? [...Array(7)]).map((post, index) => (
          <Grid key={`postItem${index}`} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
            {post ? <PostItem index={index} post={post} /> : <PostSkeleton />}
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
