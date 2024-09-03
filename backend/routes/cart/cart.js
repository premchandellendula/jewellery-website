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
        const productDetails = await prisma.product.findFirst({
            where: {
                id: productId
            }
        })

        if(!productDetails){
            return res.status(404).json({
                message: "Product not found"
            })
        }

        const {name, description, price, imageUrl} = productDetails
        console.log(name);
        console.log(description);
        console.log(price);
        console.log(imageUrl);
        const cartItem = await prisma.cart.create({
            data: { 
                userId: req.userId, 
                productId, 
                name,
                description,
                price,
                imageUrl,
                quantity 
            },
        });
        res.json({cartItem});
    } catch (error) {
        console.log('error during creating : ', error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/', authMiddleware, async (req, res) => {
    const userId = req.userId;
    // console.log(userId);
    try{
        const cart = await prisma.cart.findMany({
            where: {userId: 10},
            // include: {product: true}
        })

        console.log(req.userId);
        res.json({
            cart
        })
    }catch(e){
        res.status(500).json({
            message: "Server error"
        })
    }
})

router.put('/:id', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const {quantity} = req.body;
    const { id } = req.params;

    try{
        const cartItem = await prisma.cart.update({
            where: {
                id: parseInt(id),
                userId: userId
            }, 
            data: {
                quantity: quantity
            }
        })

        return res.status(200).json({
            cartItem
        })
    }catch(e){
        res.status(500).json({
            message: "Server error, put"
        })
    }
    
})

router.delete('/:id', authMiddleware, async (req, res) => {
    const userId = parseInt(req.userId);
    console.log(userId)

    const { id} = req.params;

    try{
        const cartItem = await prisma.cart.findFirst({
            where: {
                id : parseInt(id)
            }
        })
        console.log(cartItem)

        console.log(cartItem.userId === userId)
        if(!cartItem || cartItem.userId !== userId){
            return res.status(404).json({
                message: "Uh oh! No item or item not yours"
            })
        }

        const deletedItem = await prisma.cart.delete({
            where: {
                id: parseInt(id)
            }
        })

        res.json({
            deletedItem
        })
    }catch(error){
        console.error('Error during deleting cart item:', error.message);
        console.error(error.stack);
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
})

module.exports = router;