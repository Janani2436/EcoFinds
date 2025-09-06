import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" align="center">Product not found!</Typography>
        <Box textAlign="center" mt={2}>
            <Button component={Link} to="/" variant="contained">Back to Shop</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* THE FIX: We have replaced the <Grid container> with a <Box> using Flexbox */}
        <Box sx={{
          display: 'flex',
          gap: 4,
          // On extra-small (xs) screens, layout is a column.
          // On medium (md) screens and up, layout is a row.
          flexDirection: { xs: 'column', md: 'row' }
        }}>

          {/* This is the first column (image) */}
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src={product.imageUrl.replace('300','600x400')}
              alt={product.title}
              sx={{ width: '100%', borderRadius: '8px', display: 'block' }}
            />
          </Box>

          {/* This is the second column (details) */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom>{product.title}</Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>{product.category}</Typography>
            <Typography variant="h5" color="primary" sx={{ my: 2 }}>${product.price.toFixed(2)}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Button variant="contained" sx={{ mt: 3 }} onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </Box>

        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetailPage;