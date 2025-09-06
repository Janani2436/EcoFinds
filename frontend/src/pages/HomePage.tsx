import { Box, Button, Container, Fab, TextField, Typography } from '@mui/material';
// We have completely removed Grid from the import line.
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

const HomePage = () => {
  const { user } = useAuth();
  const { products } = useProducts();

  return (
    <>
      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>Find Your Next Treasure</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <TextField label="Search products..." variant="outlined" sx={{ minWidth: { xs: '100%', sm: '300px' } }} />
            <Button variant="contained">Search</Button>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Button>All</Button>
              <Button>Apparel</Button>
              <Button>Furniture</Button>
              <Button>Electronics</Button>
          </Box>
        </Box>

        {/* THE FIX: We have replaced <Grid container> with a <Box> using display: 'grid'. */}
        {/* This creates a modern, reliable, and responsive grid layout. */}
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
          {products.map((product) => (
            // The wrapping Grid is no longer needed. The parent Box controls the layout.
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Container>
      
      {user && (
        <Fab color="primary" aria-label="add" component={Link} to="/add-product" sx={{position: 'fixed', bottom: 32, right: 32}}>
          <AddIcon />
        </Fab>
      )}
    </>
  );
};

export default HomePage;