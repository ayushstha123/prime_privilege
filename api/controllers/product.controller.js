const Product = require('../models/products.model.js');
const { errorHandler } = require('../utils/error.js');

exports.createProduct = async (req, res, next) => {
  const { businessId, name, price, description, discount } = req.body;

  // Basic validation
  if ( !name || !price || !description || !discount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newProduct = new Product({
      businessId:req.user.id,
      name,
      price,
      description,
      discount,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
    next(error); // Pass the error to the error-handling middleware if any
  }
}
exports.getProducts = async (req, res) => {
  const { id } = req.params; // Extract business ID from URL parameter

  try {
      // Fetch products associated with the business ID
      const products = await Product.find({ businessId: id });

      if (!products) {
          return res.status(404).json({ message: 'Products not found' });
      }

      res.status(200).json(products);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

  exports.updateProduct = async (req, res, next) => {
    const { id } = req.params; // Extract the product ID from URL parameters
    const { name, price, description, discount } = req.body; // Extract updated fields from request body
  
    // Basic validation
    if (!name || !price || !description || !discount) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Find the product by ID and update it
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, price, description, discount },
        { new: true } // Return the updated document
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product', error });
      next(error); // Pass the error to the error-handling middleware if any
    }
  };


exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        // Check if the product exists
        if (!product) {
            return next(errorHandler(404, "Product not found"));
        }

        // Check ownership: Assuming req.user.id is the logged-in user's ID
        if (product.businessId.toString() !== req.user.id) {
            return next(errorHandler(403, "You are not allowed to delete this product"));
        }
        const businessProducts = await Product.find({ businessId: req.user.id });
        if (businessProducts.length <= 1) {
          return next(errorHandler(400, "You cannot delete the last product of your business"));
        }

        // Delete the product
        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "The product has been deleted successfully" });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};
