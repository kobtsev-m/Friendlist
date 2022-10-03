import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import logo2 from '../../assets/img/logo/2.png';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { LoginUserInput } from '../../types/api.types';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/material';
import { AppRoutes } from '../../router/routes';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('This is a required field'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('This is a required field')
});

export const SignInPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const { userStore } = useStores();

  const handleSubmit = async (values: LoginUserInput) => {
    await userStore.login.action(values);
    if (!userStore.login.error) {
      navigate(AppRoutes.Home);
    }
  };

  const formik = useFormik<LoginUserInput>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <Box sx={{ background: 'text.primary' }}>
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pr: 5
            }}
          >
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ width: '100%', mt: 3 }}
            >
              {userStore.login.error && (
                <Alert severity='error' sx={{ mb: 3 }}>
                  {userStore.login.error}
                </Alert>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label='Email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label='Password'
                    type='password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 3 }}
                loading={userStore.login.loading}
              >
                Sign in
              </LoadingButton>
              <Box>
                <Button
                  size='small'
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup');
                  }}
                >
                  Doesn't have an account? Sign up
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sx={{ position: 'relative', pl: 5 }}>
            <Box sx={{ position: 'absolute', top: 12, left: 52 }}>
              <Button
                variant='contained'
                size='large'
                color='primary'
                onClick={() => navigate(AppRoutes.Home)}
              >
                <ArrowBackIosIcon />
                Home Page
              </Button>
            </Box>
            <div
              style={{
                backgroundImage: `url(${logo2})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '70vh',
                borderRadius: '4px'
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
});
