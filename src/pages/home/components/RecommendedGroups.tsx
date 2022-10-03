import _ from 'lodash';
import Slider from 'react-slick';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, CardHeader, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { CarouselArrows } from '../../../components/molecules/CarouselArrows';
import { Iconify } from '../../../components/atoms/Iconify';
import { Label } from '../../../components/atoms/Label';
import { Image } from '../../../components/atoms/Image';
import { fDateTime } from '../../../utils/date.utils';
import Grid from '@mui/material/Grid';
import { Group } from '../../../types/model.types';
import { GROUPS } from '../../../assets/mock/groups.mock';

export const RecommendedGroups: React.FC = () => {
  const theme = useTheme();
  const carouselRef = useRef<Slider>(null);
  const [groups, setGroups] = useState<Group[] | undefined>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      setGroups(GROUPS);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ py: 2 }}>
      <CardHeader
        title='Groups'
        subheader='5 recommended'
        action={
          <CarouselArrows
            customIcon={'ic:round-keyboard-arrow-right'}
            onNext={handleNext}
            onPrevious={handlePrevious}
            sx={{ '& .arrow': { width: 28, height: 28, p: 0 } }}
          />
        }
        sx={{
          p: 0,
          mb: 3,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />

      {groups ? (
        <Slider ref={carouselRef} {...settings}>
          {GROUPS.map((group) => (
            <RecommendedGroupItem key={group.id} group={group} />
          ))}
        </Slider>
      ) : (
        <Grid container spacing={2}>
          {[...Array(4)].map((_, index) => (
            <Grid key={`groupItem${index}`} item xs={3}>
              <Skeleton variant='rectangular' height={300} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

interface ItemProps {
  group: Group;
}

const RecommendedGroupItem: React.FC<ItemProps> = ({ group }) => {
  const { avatar, users, name, category, createdAt, postType } = group;
  return (
    <Paper sx={{ m: 1.5, borderRadius: 2, bgcolor: 'background.neutral' }}>
      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar alt={name} src={avatar} />
          <div>
            <Typography variant='subtitle2'>{name}</Typography>
            <Typography
              variant='caption'
              sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}
            >
              {fDateTime(createdAt)}
            </Typography>
          </div>
        </Stack>

        <Stack direction='column' spacing={1} sx={{ color: 'text.secondary' }}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Iconify icon={'bx:category-alt'} width={16} height={16} />
            <Typography noWrap variant='caption'>
              {category}
            </Typography>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Iconify icon={'akar-icons:person'} width={16} height={16} />
            <Typography variant='caption'>{users.length}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box sx={{ p: 1, pb: 3, position: 'relative' }}>
        {postType && (
          <Label
            variant='filled'
            color={(postType === 'new' && 'warning') || 'error'}
            sx={{
              right: 16,
              zIndex: 9,
              bottom: 16,
              position: 'absolute',
              textTransform: 'capitalize'
            }}
          >
            {_.capitalize(postType)}
          </Label>
        )}
        <Grid container spacing={2} height={160}>
          {users.map((avatarUrl, i) => (
            <Grid key={`groupItem${group.id}${i}`} item xs={4}>
              <Image src={avatarUrl} ratio='1/1' sx={{ borderRadius: 1 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};
