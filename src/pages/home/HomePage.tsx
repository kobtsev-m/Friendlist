import { Card, Paper } from '@mui/material';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { CategoriesForUser } from './components/CategoriesForUser';
import { useStores } from '../../hooks/useStores';
import { AppRoutes } from '../../router/routes';
import { useNavigate } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { RecommendedGroups } from './components/RecommendedGroups';
import { NewestPosts } from './components/NewestPosts';
import logo7 from '../../assets/img/logo/7.png';
import { ShowMoreButton } from '../../components/atoms/ShowMoreButton';
import { PageHeader } from '../../components/organisms/PageHeader';
import { WelcomeSvg } from '../../assets/svg/welcome.svg';

export const HomePage: React.FC = observer(() => {
  const navigate = useNavigate();
  const { userStore } = useStores();
  return !userStore.user ? (
    <Card>
      <CardMedia component='div' sx={{ backgroundImage: `url(${logo7})`, height: '560px' }} />
      <Box sx={{ p: 3 }}>
        <CardContent>
          <Typography gutterBottom variant='h4' component='div'>
            Welcome!
          </Typography>
          <Typography variant='h5' color='text.secondary'>
            Find friends, like-minded people or a soul mate near you
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant='outlined' onClick={() => navigate(AppRoutes.SingUp)}>
            Sign Up
          </Button>
          <Button variant='outlined' onClick={() => navigate(AppRoutes.SingIn)}>
            Sign In
          </Button>
        </CardActions>
      </Box>
    </Card>
  ) : (
    <>
      <Paper sx={{ p: 5 }}>
        <PageHeader
          title={`Welcome back, ${userStore.user.firstName}`}
          subtitle={'We prepared some categories which may interest you'}
          Svg={WelcomeSvg}
          getBackground={(theme) => theme.palette.secondary.light}
          getTextColor={(theme) => theme.palette.grey[900]}
        />
        <Box mt={4}>
          <CategoriesForUser />
        </Box>
        <ShowMoreButton onClick={() => navigate(AppRoutes.Categories)} />
      </Paper>
      <Paper sx={{ mt: 3, p: 5 }}>
        <NewestPosts />
        <ShowMoreButton onClick={() => navigate(AppRoutes.Posts)} />
      </Paper>
      <Paper sx={{ mt: 3, p: 5 }}>
        <RecommendedGroups />
        <ShowMoreButton onClick={() => navigate(AppRoutes.Groups)} />
      </Paper>
    </>
  );
});
