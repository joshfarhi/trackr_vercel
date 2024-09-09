import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button } from '@/components/ui/button'; // Assuming you have this component

// Define the shape of the product data
interface Product {
  productName: string;
  growerName: string;
  categoryName: string;
  date: string;
}

const ProductModalPage = () => {
  const router = useRouter();
  const { id } = router.query; // Extract product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);  // State for storing product data
  const [modalIsOpen, setModalIsOpen] = useState(true);  // Control modal visibility

  useEffect(() => {
    if (id) {
      // Fetch product data by ID
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data: Product) => setProduct(data));  // Assign the fetched data to product state
    }
  }, [id]);

  // Close modal and navigate back to the inventory page
  const closeModal = () => {
    setModalIsOpen(false);
    router.push('/inventory');  // Redirect to the inventory page after closing
  };

  // Handle loading state while fetching product details
  if (!product) return <p>Loading...</p>;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Product Details Modal"
      className="flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black/50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Details for {product.productName}</h2>
        <p><strong>Grower:</strong> {product.growerName}</p>
        <p><strong>Category:</strong> {product.categoryName}</p>
        <p><strong>Date:</strong> {new Date(product.date).toLocaleDateString()}</p>
        <Button className="mt-4 w-full" onClick={closeModal}>Close</Button>
      </div>
    </Modal>
  );
};

export default ProductModalPage;
