import { Box, Button, Container, Typography } from '@mui/material';
// We have removed Grid from this import line.
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

const MyListingsPage = () => {
  const { user } = useAuth();
  const { products, deleteProduct } = useProducts();

  const userProducts = user ? products.filter(p => p.userId === user.id) : [];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>My Listings</Typography>
      {userProducts.length > 0 ? (
        // THE FIX: We have replaced <Grid container> with a <Box> using display: 'grid'.
        // This is a modern and reliable way to create a responsive grid layout.
        <Box sx={{
          display: 'grid',
          gap: 4,
          // Defines the number of columns at different screen sizes:
          // xs: 1 column, sm: 2 columns, md: 3 columns
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }
        }}>
          {userProducts.map((product) => (
            // The wrapping Grid item is no longer needed.
            // The parent Box now controls the entire layout.
            <ProductCard
              key={product.id}
              product={product}
              showActions={true}
              onDelete={deleteProduct}
            />
          ))}
        </Box>
      ) : (
        <Box textAlign="center" mt={4}>
          <Typography>You haven't listed any products yet.</Typography>
          <Button component={Link} to="/add-product" variant="contained" sx={{ mt: 2 }}>
            List Your First Item
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MyListingsPage;