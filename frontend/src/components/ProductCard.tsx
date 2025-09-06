import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { type Product } from '../context/ProductContext';

type ProductCardProps = {
  product: Product;
  showActions?: boolean;
  onDelete?: (id: number) => void;
};

const ProductCard = ({ product, showActions = false, onDelete }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { id, title, price, imageUrl, category } = product;
  
  const handleDeleteClick = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this listing?')) {
      onDelete(id);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
        sx={{ backgroundColor: '#eee' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
        <Typography variant="body2" color="text.secondary">{category}</Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>${price.toFixed(2)}</Typography>
      </CardContent>
      <CardActions>
        {showActions ? (
          <>
            <Button size="small" component={Link} to={`/edit-product/${id}`}>Edit</Button>
            <Button size="small" color="error" onClick={handleDeleteClick}>Delete</Button>
          </>
        ) : (
          <>
            <Button size="small" component={Link} to={`/product/${id}`}>View</Button>
            <Button size="small" onClick={handleAddToCart}>Add to Cart</Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;