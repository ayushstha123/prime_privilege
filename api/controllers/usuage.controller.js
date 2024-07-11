const DiscountUsage = require('../models/discountUsage.model.js');
const User = require('../models/user.model.js');
const { errorHandler } = require('../utils/error.js');

exports.addDiscountUsage = async (req, res, next) => {
  const { businessId, studentEmail, productName, discountAmount } = req.body;

  try {
    // Delete expired discount usages
    const today = new Date();
    await DiscountUsage.deleteMany({ expirationDate: { $lte: today } });

    // Find the student user by email
    const studentUser = await User.findOne({ email: studentEmail });
    if (!studentUser) {
      return next(errorHandler(404, 'Student user not found.'));
    }

    // Check if the user is a student
    if (!['student', 'idleStudent'].includes(studentUser.role)) {
      return next(errorHandler(400, 'Student user not found'));
    }

    // Check if a discount usage record already exists for the specific product
    let discountUsage = await DiscountUsage.findOne({ businessId, studentEmail, productName });
    if (discountUsage) {
      // If discount usage already exists, return an error
      return next(errorHandler(400, 'Discount already used by the student.'));
    } else {
      // Create a new discount usage record with a 2-month expiration date
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      discountUsage = new DiscountUsage({
        businessId,
        studentEmail,
        expirationDate,
        usageCount: 1,
        productName,
        discountAmount,
      });
      await discountUsage.save();
    }

    res.status(200).json(discountUsage);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getUsage = async (req, res, next) => {
  const { businessId } = req.params;

  try {
    // Delete expired discount usages
    const today = new Date();
    await DiscountUsage.deleteMany({ expirationDate: { $lte: today } });

    // Find all discount usage records for the specified business
    const discountUsages = await DiscountUsage.find({ businessId });

    if (!discountUsages.length) {
      return res.status(404).json({ message: 'No discount usage records found for this business.' });
    }

    // Prepare response with product name and discount amount
    const usageDetails = discountUsages.map(usage => ({
      studentEmail: usage.studentEmail,
      productName: usage.productName,
      discountAmount: usage.discountAmount,
      usageCount: usage.usageCount,
      expirationDate: usage.expirationDate,
    }));

    res.status(200).json(usageDetails);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getAllDiscountUsages = async (req, res, next) => {
  const isSuperAdmin = req.user && req.user.role === 'superAdmin';

  try {
    // Delete expired discount usages
    const today = new Date();
    await DiscountUsage.deleteMany({ expirationDate: { $lte: today } });

    if (isSuperAdmin) {
      const discountUsages = await DiscountUsage.find().populate('businessId', 'email name');
      res.status(200).json(discountUsages);
    } else {
      return next(errorHandler(403, "You are not allowed to see users"));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.userUsages = async (req, res, next) => {
  const { userId } = req.params;

  try {
    // Delete expired discount usages
    const today = new Date();
    await DiscountUsage.deleteMany({ expirationDate: { $lte: today } });

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found.'));
    }

    // Find all discount usage records for the specified user email
    const userHistory = await DiscountUsage.find({ studentEmail: user.email }).populate('businessId', 'name email');

    if (!userHistory.length) {
      return res.status(404).json({ message: 'No discount usage records found for this user.' });
    }

    // Map the user history to include business details
    const history = userHistory.map(record => ({
      business: {
        name: record.businessId.name,
        email: record.businessId.email,
      },
      productName: record.productName,
      discountAmount: record.discountAmount,
      usageCount: record.usageCount,
      expirationDate: record.expirationDate,
    }));

    res.status(200).json(history);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
