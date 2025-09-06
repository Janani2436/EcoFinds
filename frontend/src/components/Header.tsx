import { useState } from 'react';
import { 
  AppBar, Badge, Box, Button, Drawer, IconButton, InputBase, 
  List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Divider, Paper 
} from '@mui/material';
import { Link } from 'react-router-dom';

// --- Import the new AccountCircleIcon ---
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // <-- ADD THIS IMPORT

import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const drawerLinks = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setIsDrawerOpen(false)}
      onKeyDown={() => setIsDrawerOpen(false)}
    >
      {user ? (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/my-listings">
                <ListItemText primary="My Listings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/purchases">
                <ListItemText primary="My Purchases" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/signup">
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#333' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton size="large" edge="start" color="inherit" onClick={() => setIsDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Link to="/">
              <img src={logo} alt="EcoFinds Logo" style={{ height: '45px', display: 'block' }} />
            </Link>
          </Box>

          {/* --- Right Section: Cart and Profile Icons --- */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {user && (
              <>
                <IconButton color="inherit" component={Link} to="/cart" size="large">
                  <Badge badgeContent={totalCartItems} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                {/* --- THIS IS THE NEW PROFILE ICON BUTTON --- */}
                <IconButton color="inherit" component={Link} to="/profile" size="large" sx={{ ml: 1 }}>
                  <AccountCircleIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {drawerLinks}
      </Drawer>

      <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', boxShadow: 'none', borderTop: '1px solid #e0e0e0' }}>
        <Toolbar sx={{ justifyContent: 'center', paddingY: 2, flexDirection: 'column', gap: 2 }}>
          <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '90%', maxWidth: '700px' }}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search EcoFinds..." />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button variant="outlined" size="small">Filter</Button>
            <Button variant="outlined" size="small">Sort</Button>
            <Button variant="outlined" size="small">Group By</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;