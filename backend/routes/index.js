const express = require('express')

const router = express.Router()
const userRouter = require('./user');
const productRouter = require('./products');
const categoryRouter = require('./category');
const cartRouter = require('./cart');
const adminRouter = require('./admin');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);
router.use('/admin', adminRouter);

module.exports = router;