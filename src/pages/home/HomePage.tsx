import React from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/user.store';
import logo4 from '../../assets/img/logo4.png';
import { CategoryList } from './CategoryList/CategoryList';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  return (
    <>
      <Card>
        <CardMedia component='div' sx={{ backgroundImage: `url(${logo4})`, height: '600px' }} />
        <Box sx={{ p: 3 }}>
          <CardContent>
            <Typography gutterBottom variant='h4' component='div'>
              Welcome!
            </Typography>
            <Typography variant='h5' color='text.secondary'>
              Find friends, like-minded people or a soul mate near you
            </Typography>
          </CardContent>
          {!user && (
            <CardActions>
              <Button variant='outlined' onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
              <Button variant='outlined' onClick={() => navigate('/signin')}>
                Sign In
              </Button>
            </CardActions>
          )}
        </Box>
      </Card>
      {user && (
        <Card sx={{ mt: 3 }}>
          <Box sx={{ p: 5 }}>
            <CategoryList />
          </Box>
        </Card>
      )}
    </>
  );
};
