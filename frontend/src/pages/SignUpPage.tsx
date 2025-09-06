import { useState } from 'react';
import { Avatar, Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';
// Make sure you have your apiClient configured
import apiClient from '../services/apiClient';

type FormValues = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
  const password = watch('password');

  // --- THIS IS THE CORRECTED FUNCTION ---
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Create the payload for the backend, mapping displayName to name
      const payload = {
        name: data.displayName,
        email: data.email,
        password: data.password,
      };

      console.log('Sending Sign Up Data:', payload);

      // Make the API call to the register endpoint
      await apiClient.post('/auth/register', payload);

      alert('Account created! You can now log in.');
      navigate('/login');
    } catch (error) {
      console.error('Sign up failed:', error);
      alert('Sign Up Failed: This email may already be in use or there was a server error.');
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Sign up</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              fullWidth
              id="displayName"
              label="Display Name"
              autoFocus
              {...register('displayName', { required: 'Display Name is required' })}
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              required
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'The passwords do not match'
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
          <Box sx={{ textAlign: 'right' }}>
            <Link to="/login">Already have an account? Sign in</Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;