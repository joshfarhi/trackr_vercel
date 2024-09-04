import React, { useState, useEffect } from "react";

interface EditProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: ProductHistoryRow;
}

function EditProductDialog({ open, setOpen, product }: EditProductDialogProps) {
  const [formData, setFormData] = useState({
    amount: product.amount,
    grower: product.growerName,
    category: product.categoryName,
    updatedAt: new Date().toISOString(), // default to current time
  });

  useEffect(() => {
    setFormData({
      amount: product.amount,
      grower: product.growerName,
      category: product.categoryName,
      updatedAt: new Date().toISOString(),
    });
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API or update state here with new product details
    console.log("Updated product:", formData);

    // Close the dialog after submission
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="dialog">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Grower:</label>
          <input
            type="text"
            name="grower"
            value={formData.grower}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Updated At:</label>
          <input
            type="datetime-local"
            name="updatedAt"
            value={formData.updatedAt}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProductDialog;
