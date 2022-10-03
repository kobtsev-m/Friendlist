import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/organisms/PageHeader';
import { Box, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { GroupsSvg } from '../../assets/svg/groups.svg';
import { GROUPS } from '../../assets/mock/groups.mock';
import { Image } from '../../components/atoms/Image';
import { Iconify } from '../../components/atoms/Iconify';
import { fDate } from '../../utils/date.utils';
import { Group } from '../../types/model.types';

export const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[] | undefined>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      setGroups(GROUPS);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Paper sx={{ p: 5 }}>
      <PageHeader
        title={'Groups'}
        subtitle={'Join groups with like-minded people are create your own communities'}
        Svg={GroupsSvg}
        getBackground={(theme) => theme.palette.action.focus}
        getTextColor={(theme) => theme.palette.text.primary}
      />
      <Box mt={3}>
        <Grid container spacing={3}>
          {(groups ?? [...Array(6)]).map((group: Group | undefined, index) => (
            <Grid key={`groupItem${index}`} item xs={4}>
              {group ? (
                <GroupItem group={group} index={index} />
              ) : (
                <Skeleton variant='rectangular' height={350} />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

interface ItemProps {
  group: Group;
  index: number;
}

const GroupItem: React.FC<ItemProps> = ({ group, index }) => {
  return (
    <Paper sx={{ height: '100%', borderRadius: 1 }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            top: 0,
            left: 0,
            zIndex: 9,
            opacity: 0,
            background: 'rgb(0 0 0 / 50%)',
            borderRadius: 1,
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              opacity: 1
            }
          }}
        >
          <Grid container spacing={1} sx={{ p: 2 }}>
            {group.users.map((avatarUrl, avatarIndex) => (
              <Grid key={`groupItem${index}avatar${avatarIndex}`} item xs={4}>
                <Image src={avatarUrl} ratio='1/1' sx={{ borderRadius: 1, cursor: 'pointer' }} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Image alt={group.name} src={group.avatar} ratio='1/1' sx={{ borderRadius: 1 }} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant='subtitle1' fontSize={18}>
          {group.name}
        </Typography>
        <Stack direction='row' spacing={1}>
          <Box>
            <Iconify icon={'bx:category-alt'} width={20} height={20} />
          </Box>
          <Box sx={{ fontSize: 14 }}>{group.category}</Box>
        </Stack>
        <Stack direction='row' spacing={1}>
          <Box>
            <Iconify icon={'clarity:date-line'} width={20} height={20} />
          </Box>
          <Box sx={{ fontSize: 14 }}>{fDate(group.createdAt)}</Box>
        </Stack>
      </Stack>
    </Paper>
  );
};
