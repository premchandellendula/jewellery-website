const express = require('express')
const router = express.Router();
const zod = require('zod');

const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json({
            products
        })
    }catch(e){
        res.status(500).json({
            message: "Server error"
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        })

        if(!product){
            res.status(404).json({
                message: "Product not found"
            })
        }

        res.json({
            product
        })
    }catch(e){
        res.status(500).json({
            message: "Server erro"
        })
    }
})

module.exports = router