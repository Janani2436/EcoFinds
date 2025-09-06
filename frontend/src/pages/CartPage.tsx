import { Box, Button, Card, CardContent, CardMedia, Container, IconButton, Paper, Typography } from '@mui/material';
// We have removed Grid from the import line.
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>My Shopping Cart</Typography>
      {cartItems.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography>Your cart is empty.</Typography>
          <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>Continue Shopping</Button>
        </Box>
      ) : (
        // THE FIX: We have replaced <Grid container> with a <Box> using Flexbox.
        <Box sx={{
          display: 'flex',
          gap: 4,
          // On extra-small (xs) screens, layout is a column.
          // On medium (md) screens and up, layout is a row.
          flexDirection: { xs: 'column', md: 'row' }
        }}>

          {/* This is the first column (cart items) */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 70%' } }}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ display: 'flex', mb: 2 }}>
                <CardMedia component="img" sx={{ width: 151 }} image={item.imageUrl} alt={item.title}/>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <CardContent>
                    <Typography component="div" variant="h5">{item.title}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">${item.price.toFixed(2)}</Typography>
                    <Typography variant="body2" sx={{mt: 1}}>Quantity: {item.quantity}</Typography>
                  </CardContent>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                    <IconButton aria-label="delete" onClick={() => removeFromCart(item.id)}><DeleteIcon /></IconButton>
                </Box>
              </Card>
            ))}
          </Box>

          {/* This is the second column (order summary) */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
            <Paper elevation={2} sx={{p: 2}}>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                    <Typography>Subtotal</Typography>
                    <Typography fontWeight="bold">${getCartTotal().toFixed(2)}</Typography>
                </Box>
                <Button variant="contained" fullWidth>Proceed to Checkout</Button>
            </Paper>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;