export const getProductAvailability = (product) => {
  if (product.stock === 0) {
    return 'Out of stock';
  } else if (product.stock < 30) {
    return 'Few left';
  }
  return 'Available';
};
