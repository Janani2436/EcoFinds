// In frontend/src/pages/ProfilePage.tsx

import { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient'; // Make sure you have your configured apiClient

const ProfilePage = () => {
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const response = await apiClient.get('/auth/profile');
          const profileData = response.data;
          
          setName(profileData.name);
          
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          setName(user.name || 'User');
          
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [user]);

  // --- THIS IS THE UPDATED FUNCTION ---
  const handleUpdateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Make a PUT request to the backend with the new name
      const response = await apiClient.put('/auth/profile', { name });
      
      // Update the local state with the successfully saved name from the backend
      setName(response.data.user.name);

      alert('Profile updated successfully!');
      setIsEditing(false); // Switch back to view mode
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
  }
  
  if (!user) {
    return <Typography sx={{ textAlign: 'center', mt: 4 }}>Please log in to view your profile.</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: 'secondary.main' }}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography component="h1" variant="h4">
          My Profile
        </Typography>

        {isEditing ? (
          <Box component="form" onSubmit={handleUpdateProfile} sx={{ mt: 3, width: '100%' }}>
            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
            
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)} fullWidth sx={{ mt: 1 }}>
              Cancel
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1" color="text.secondary">{email}</Typography>
            <Button onClick={() => setIsEditing(true)} variant="contained" sx={{ mt: 3, width: '50%' }}>
              Edit Profile
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;