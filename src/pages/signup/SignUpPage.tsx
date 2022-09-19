import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import logo3 from '../../assets/img/logo3.png';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { CreateUserInput } from '../../types/api';
import * as yup from 'yup';
import { AppRoutes } from '../../router/routes';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../../api/auth.api';
import { Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import * as _ from 'lodash';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
  firstName: yup.string().required('This is a required field'),
  lastName: yup.string().required('This is a required field'),
  email: yup.string().email('Enter a valid email').required('This is a required field'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('This is a required field'),
  termsOfUse: yup.boolean().equals([true], 'This is a required field')
});

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [register, registerMutation] = useMutation<
    { register: string },
    { input: CreateUserInput }
  >(REGISTER_MUTATION);

  const formik = useFormik<CreateUserInput & { termsOfUse: boolean }>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      termsOfUse: false
    },
    validationSchema,
    onSubmit: async (values) => {
      const newValues = _.omit(values, 'termsOfUse');
      const { data } = await register({ variables: { input: newValues } });
      if (!data) {
        return;
      }
      toast('You successfully registered!', { type: 'success' });
      navigate('/signin');
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
          <Grid item xs={6} sx={{ position: 'relative', pr: 3 }}>
            <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
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
                backgroundImage: `url(${logo3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '70vh',
                borderRadius: '4px'
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pl: 3
            }}
          >
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ width: '100%', mt: 3 }}
            >
              {registerMutation.error && (
                <Alert severity='error' sx={{ mb: 3 }}>
                  {registerMutation.error.message}
                </Alert>
              )}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label='First Name'
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && !!formik.errors.firstName}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label='Last Name'
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
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
                    name='password'
                    label='Password'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value='allowExtraEmails'
                        color='primary'
                        name='termsOfUse'
                        checked={formik.values.termsOfUse}
                        onChange={formik.handleChange}
                      />
                    }
                    label='I accept terms of use and privacy policy.'
                  />
                  {formik.touched.termsOfUse && formik.errors.termsOfUse && (
                    <Typography variant='caption' color='error'>
                      {formik.errors.termsOfUse}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ my: 3 }}
                loading={registerMutation.loading}
              >
                Sign Up
              </LoadingButton>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link
                    href=''
                    variant='body2'
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/signin');
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
