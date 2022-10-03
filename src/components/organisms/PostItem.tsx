import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Avatar, Box, Card, CardContent, Link, Stack, Typography } from '@mui/material';
import { SvgIconStyle } from '../atoms/SvgIconStyle';
import { Image } from '../atoms/Image';
import { TextMaxLine } from '../atoms/TextMaxLine';
import { TextIconLabel } from '../atoms/TextIconLabel';
import { Iconify } from '../atoms/Iconify';
import { useResponsive } from '../../hooks/useResponsive';
import { fDate } from '../../utils/date.utils';
import { AppRoutes } from '../../router/routes';
import { fShortenNumber } from '../../utils/number.utils';
import { Post } from '../../types/model.types';

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8)
}));

interface Props {
  post: Post;
  index: number;
}

export const PostItem: React.FC<Props> = ({ post, index }) => {
  const isDesktop = useResponsive('up', 'md');
  const { cover, author } = post;
  const latestPost = index < 3;

  if (isDesktop && latestPost) {
    return (
      <Card>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            alt={author.name}
            src={author.avatarUrl}
            sx={{
              zIndex: 9,
              top: 24,
              left: 24,
              width: 40,
              height: 40,
              position: 'absolute'
            }}
          />
          <NewestPostItemContent index={index} {...post} />
          <OverlayStyle />
          <Image alt='cover' src={cover} sx={{ height: 360 }} />
        </Box>
      </Card>
    );
  }
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src='https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg'
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper'
          }}
        />
        <Avatar
          alt={author.name}
          src={author.avatarUrl}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute'
          }}
        />
        <Image alt='cover' src={cover} ratio='4/3' />
      </Box>
      <NewestPostItemContent index={index} {...post} />
    </Card>
  );
};

interface ContentProps extends Post {
  index: number;
}

const NewestPostItemContent: React.FC<ContentProps> = ({
  title,
  view,
  comment,
  share,
  createdAt,
  index
}) => {
  const isDesktop = useResponsive('up', 'md');
  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const topicInfo = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' }
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white'
        })
      }}
    >
      <Typography
        gutterBottom
        variant='caption'
        component='div'
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white'
          })
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <Link to={AppRoutes.Home} color='inherit' component={RouterLink} underline='none'>
        <TextMaxLine
          variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'}
          line={2}
          persistent
        >
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap='wrap'
        direction='row'
        justifyContent='flex-end'
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.55,
            color: 'common.white'
          })
        }}
      >
        {topicInfo.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
};
