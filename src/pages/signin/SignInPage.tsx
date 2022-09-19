import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import logo2 from '../../assets/img/logo2.png';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { LoginUserInput, User } from '../../types/api';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_QUERY } from '../../api/auth.api';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/material';
import { AppRoutes } from '../../router/routes';
import { setTokenInLocalStorage, updateTokenHeader } from '../../utils/token.utils';
import { GET_USER_QUERY } from '../../api/user.api';
import { useUserStore } from '../../store/user.store';

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('This is a required field'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('This is a required field')
});

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const [login, loginQuery] = useLazyQuery<{ login: string }, { input: LoginUserInput }>(
    LOGIN_QUERY
  );
  const [getUser] = useLazyQuery<{ getUser: User }>(GET_USER_QUERY);

  const setUser = useUserStore((state) => state.setUser);

  const formik = useFormik<LoginUserInput>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      // Getting token
      const { data: loginData } = await login({ variables: { input: values } });
      if (!loginData) {
        return;
      }
      const token = loginData.login;
      setTokenInLocalStorage(token);
      await updateTokenHeader();
      // Getting user
      const { data: getUserData } = await getUser();
      if (!getUserData) {
        return;
      }
      const user = getUserData.getUser;
      setUser(user);
      // Redirect to home page
      navigate(AppRoutes.Home);
    }
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
              {loginQuery.error && (
                <Alert severity='error' sx={{ mb: 3 }}>
                  {loginQuery.error.message}
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
                loading={loginQuery.loading}
              >
                Sign in
              </LoadingButton>
              <Box>
                <Link
                  href=''
                  variant='body2'
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup');
                  }}
                >
                  Doesn't have an account? Sign up
                </Link>
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
};
