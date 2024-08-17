const express = require('express');
const router = express.Router();
const zod = require('zod');

const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../middleware/userMiddleware');
const prisma = new PrismaClient();

const cartBody = zod.object({
    productId: zod.number(),
    quantity: zod.number()
})

router.post('/', authMiddleware, async (req, res) => {
    const { productId, quantity } = req.body;

    // console.log(req.userId);
    // console.log(productId);
    // console.log(quantity);
    try {
        // console.log('hwllo')
        const cartItem = await prisma.cart.create({
            data: { 
                userId: req.userId, 
                productId, 
                quantity 
            },
        });
        res.json(cartItem);
    } catch (error) {
        console.log('error during creating : ', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try{
        const cart = await prisma.cart.findMany({
            where: {userId: req.user.userId},
            include: {product: true}
        })

        console.log(req.user.userId);
        res.json({
            cart
        })
    }catch(e){
        res.status(500).json({
            message: "Server error"
        })
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const {quantity} = req.body;
})

module.exports = router;