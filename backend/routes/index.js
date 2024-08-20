const express = require('express')

const router = express.Router()
const userRouter = require('./user/user');
const productRouter = require('./product/products');
const categoryRouter = require('./category/category');
const cartRouter = require('./cart/cart');
const adminRouter = require('./admin/admin');
const adminCategoryRouter = require('./admin/adminCategory')

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);
router.use('/admin', adminRouter);
router.use('/admin/category', adminCategoryRouter);

module.exports = router;