const express = require('express');
const authMiddleware = require('../middleware/userMiddleware');
const router = express.Router();
const zod = require('zod');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/', authMiddleware, async (req, res) => {
    const {items} = req.body;

    if(!Array.isArray(items) || items.length == 0){
        return res.status(400).json({
            error: "Invalid input"
        })
    }

    try{
        const order = await prisma.$transaction(async (prisma) => {
            let totalAmount = 0;

            const orderItemsData = await Promise.all(
                items.map(async (item) => {
                    const product = await prisma.product.findUnique({
                        where: {id: item.productId}
                    })

                    if(!product) throw new Error(`Product with Id ${item.productId} not found`);

                    const itemTotal = product.price * item.quantity;
                    totalAmount += itemTotal;

                    return {
                        productId: product.id,
                        quantity: item.quantity,
                        price: product.price
                    }
                })
            )

            const newOrder = await prisma.order.create({
                data: {
                    userId: req.userId,
                    totalAmount,
                    status: "PENDING",
                    orderItems: {
                        create: orderItemsData
                    }
                },
                include: {
                    orderItems: true
                }
            })

            await prisma.cart.deleteMany()

            return newOrder
        })

        res.status(201).json({
            message: "Order placed successfully",
            order
        })
    }catch(e){
        console.error('Error placing the order:', e);
        res.status(500).json({
            error: 'An error occurred while placing the order'
        });
    }
})

router.get('/orders', authMiddleware, async (req, res) => {
    try{
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            }
        })

        if(!user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        console.log('before orders')
        const orders = await prisma.order.findMany({
            where: {
                userId: user.id
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                price: true,
                                imageUrl: true
                            }
                        }
                    }
                }
            }
        })


        console.log("before order array")
        const orderArray = orders.map(order => ({
            id: order.id,
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createAt,
            updatedAt: order.updatedAt,
            orderItems: order.orderItems.map(item => ({
                productId: item.product.id,
                name: item.product.name,
                description: item.product.description,
                price: item.product.price,
                imageUrl: item.product.imageUrl,
                quantity: item.quantity
            }))
        }))
        console.log("after order array");
        res.status(200).json({
            message: "Orders fetched successfully",
            orders: orderArray
        })

        // console.log(orderArray)
    }catch(error){
        res.status(500).json({
            error: "An error occured while fetching the orders"
        })
    }
})

module.exports = router