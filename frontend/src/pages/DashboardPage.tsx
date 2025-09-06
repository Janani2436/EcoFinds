import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
// We have completely removed Grid from the import line.
import { useAuth } from '../context/AuthContext';
import { useForm, type SubmitHandler } from 'react-hook-form';

type FormValues = {
  displayName: string;
  email: string;
};

const DashboardPage = () => {
  const { user, login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      displayName: user?.displayName || '',
      email: user?.email || '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (user) {
      const updatedUser = { ...user, displayName: data.displayName, email: data.email };
      login(updatedUser, 'fake-jwt-token-for-testing');
      alert('Profile updated successfully!');
    }
  };

  if (!user) {
    return <Typography sx={{p:4, textAlign: 'center'}}>Please log in to view your dashboard.</Typography>;
  }

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Typography component="h1" variant="h4" gutterBottom align="center">User Dashboard</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        {/* THE FIX: We have replaced the <Grid container> with a <Box> using Flexbox. */}
        <Box sx={{
          display: 'flex',
          gap: 3,
          alignItems: 'center',
          // On extra-small (xs) screens, layout is a column.
          // On small (sm) screens and up, layout is a row.
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
        
          {/* This is the first column (Avatar) */}
          <Box sx={{
            flexBasis: { xs: '100%', sm: '33.33%' },
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Avatar sx={{ width: 150, height: 150, bgcolor: 'secondary.main', fontSize: '4rem' }}>
              {user.displayName.charAt(0).toUpperCase()}
            </Avatar>
          </Box>

          {/* This is the second column (Form Fields) */}
          <Box sx={{ flexBasis: { xs: '100%', sm: '66.67%' } }}>
            <TextField
              fullWidth
              id="displayName"
              label="Display Name"
              margin="normal"
              {...register('displayName', { required: 'Display Name is required' })}
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
            />
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              margin="normal"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;