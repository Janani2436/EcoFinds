import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
// We have completely removed Grid from the import line.
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

type FormValues = {
  title: string;
  description: string;
  category: string;
  price: number;
};

const categories = ['Apparel', 'Furniture', 'Electronics', 'Accessories', 'Books', 'Other'];

const EditProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { products, updateProduct } = useProducts();
  
  const productToEdit = products.find(p => p.id === Number(productId));

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: productToEdit,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!productToEdit) return;
    updateProduct(productToEdit.id, data);
    alert('Product updated successfully!');
    navigate('/my-listings');
  };

  if (!productToEdit) {
    return <Container sx={{py: 4}}><Typography variant="h5" align="center">Product to edit was not found!</Typography></Container>;
  }

  return (
    <Container component="main" maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" gutterBottom>Edit Your Listing</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3, width: '100%' }}>
          {/* THE FIX: We have replaced the <Grid container> with a <Box> using Flexbox. */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ width: '100%' }}>
              <TextField
                required
                fullWidth
                id="title"
                label="Product Title"
                autoFocus
                {...register('title', { required: 'Title is required' })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                required
                fullWidth
                id="description"
                label="Product Description"
                multiline
                rows={4}
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
              <FormControl fullWidth required error={!!errors.category}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  label="Category"
                  defaultValue={productToEdit.category}
                  {...register('category', { required: 'Category is required' })}
                >
                  {categories.map((cat) => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
              <TextField
                required
                fullWidth
                id="price"
                label="Price ($)"
                type="number"
                InputProps={{ inputProps: { step: "0.01" } }}
                {...register('price', { 
                  required: 'Price is required', 
                  valueAsNumber: true,
                  min: { value: 0.01, message: 'Price must be positive' }
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Box>
          </Box>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Save Changes</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProductPage;