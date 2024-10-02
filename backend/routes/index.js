const express = require('express')

const router = express.Router()
const userRouter = require('./user/user');
const productRouter = require('./product/products');
const categoryRouter = require('./category/category');
const cartRouter = require('./cart/cart');
const galleryRouter = require('./gallery/gallery');
const worksRouter = require('./works/works');
const adminRouter = require('./admin/admin');
const adminCategoryRouter = require('./admin/adminCategory');
const profileRouter = require('./profile/profile')

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/cart', cartRouter);
router.use('/gallery', galleryRouter);
router.use('/works', worksRouter);
router.use('/admin', adminRouter);
router.use('/admin/category', adminCategoryRouter);
router.use('/profile', profileRouter);

module.exports = router;