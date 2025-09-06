// frontend/src/components/Navbar.tsx

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // <-- Step 3: Import the logo

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#333' }}>
      <Toolbar>
        {/* Logo and Brand Name */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img src={logo} alt="EcoFinds Logo" style={{ height: '40px', marginRight: '10px' }} /> {/* <-- Step 4: Display the logo */}
            <Typography variant="h6" component="div">
              EcoFinds
            </Typography>
          </Link>
        </Box>

        {/* Navigation Links (You can add more later) */}
        <Box>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
            <Typography>Login</Typography>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography>Sign Up</Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;