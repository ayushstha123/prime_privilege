import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', discount: '' });
  const currentUser = useSelector((state) => state.user.currentUser);
  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/business/get-product/${currentUser._id}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const validateNewProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.discount) {
      toast.error('Please fill in all required fields (Name, Price, Discount)');
      return false;
    }
    if (newProduct.price < 0 || newProduct.discount < 0) {
      toast.error('Price and Discount cannot be negative');
      return false;
    }
    if (newProduct.discount > 90) {
      toast.error('Discount should be less than 90%');
      return false;
    }
    if (isNaN(newProduct.price) || isNaN(newProduct.discount)) {
      toast.error('Price and Discount must be numeric values');
      return false;
    }
    return true;
  };
  // Handle change for new product inputs
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle change for existing product inputs
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, [name]: value } : product
    );
    setProducts(updatedProducts);
  };

  // Add a new product
  const addProduct = async () => {
    if (!validateNewProduct()) {
      return
    }
    try {
      const response = await fetch('/api/business/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      setProducts([...products, data]);
      toast.success('Product added successfully!');
      setNewProduct({ name: '', price: '', description: '', discount: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Update a product
  const updateProduct = async (productId) => {
    const productToUpdate = products.find(product => product._id === productId);
    try {
      const response = await fetch(`/api/business/update-product/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productToUpdate),
      });

      const updatedProduct = await response.json();
      const updatedProducts = products.map(product =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Remove a product
  const removeProduct = async (index) => {
    const productId = products[index]._id;
    try {
      const response = await fetch(`/api/business/delete-product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      const updatedProducts = [...products];
      updatedProducts.splice(index, 1);
      setProducts(updatedProducts);
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('There should be atleast 1 discount offer available');
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Products</h1>

      {/* New product form */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleNewProductChange}
          className="bg-slate-100 rounded-lg p-2 mr-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          onChange={handleNewProductChange}
          className="bg-slate-100 rounded-lg p-2 mr-2"
        />
        <input
          type="number"
          name="discount"
          placeholder="Product Discount"
          value={newProduct.discount}
          onChange={handleNewProductChange}
          className="bg-slate-100 rounded-lg p-2 mr-2"
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={handleNewProductChange}
          className="bg-slate-100 rounded-lg p-2 mr-2"
        />
        <button
          type="button"
          onClick={addProduct}
          className="bg-green-500 text-white p-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      {/* Product list */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Discount</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Discounted Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={(e) => handleProductChange(index, e)}
                  className="bg-slate-100 rounded-lg p-2"
                />
              </td>
              <td className="py-2 px-4 border-b">
                Rs. <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleProductChange(index, e)}
                  className="bg-slate-100 rounded-lg p-2"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={(e) => handleProductChange(index, e)}
                  className="bg-slate-100 rounded-lg p-2"
                /> %
              </td>

              <td className="py-2 px-4 border-b">
                <textarea
                  name="description"
                  value={product.description}
                  onChange={(e) => handleProductChange(index, e)}
                  className="bg-slate-100 rounded-lg p-2"
                />
              </td>
              <td className="py-2 px-4 border-b">
                Rs. <input
                  type="number"
                  name="discountedPrice"
                  value={(product.price * (1 - product.discount / 100)).toFixed(2)}
                  readOnly
                  className="bg-slate-100 rounded-lg p-2"
                />

              </td>
              <td className="py-2 px-4 border-b">
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded-lg mr-2"
                  onClick={() => updateProduct(product._id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded-lg"
                  onClick={() => removeProduct(index)}
                >Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
