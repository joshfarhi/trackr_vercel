import React, { useState, useEffect } from 'react';

interface Product {
  product: string;
  description: string;
  grower: {
    name: string;
  };
  category?: {
    name: string;
  };
  quantity: number;
}

const ProductPage: React.FC<{ id: string }> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch product data based on the slug
      fetch(`/api/products/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setProduct(data))
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.product}</h1>
      <p>{product.description}</p>
      <p>Grower: {product.grower.name}</p>
      <p>Category: {product.category?.name}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
};

export default ProductPage;