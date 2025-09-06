import { Box, Container, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider } from '@mui/material';

// Dummy data for past purchases
const pastPurchases = [
  { id: 101, title: 'Used GoPro Camera', price: 95.00, date: '2025-08-15', imageUrl: 'https://via.placeholder.com/150/95A5A6/FFFFFF?text=GoPro' },
  { id: 102, title: 'Vintage Denim Jacket', price: 45.00, date: '2025-07-22', imageUrl: 'https://via.placeholder.com/150/89B0AE/FFFFFF?text=Jacket' },
];

const PreviousPurchasesPage = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Purchase History
      </Typography>
      {pastPurchases.length > 0 ? (
        <List sx={{ bgcolor: 'background.paper' }}>
          {pastPurchases.map((item, index) => (
            <Box key={item.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={item.title} src={item.imageUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Purchased on: {item.date}
                      </Typography>
                      Price: ${item.price.toFixed(2)}
                    </>
                  }
                />
              </ListItem>
              {index < pastPurchases.length - 1 && <Divider variant="inset" component="li" />}
            </Box>
          ))}
        </List>
      ) : (
        <Typography align="center" mt={4}>You have no past purchases.</Typography>
      )}
    </Container>
  );
};

export default PreviousPurchasesPage;