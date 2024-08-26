const express = require('express')
const router = express.Router();
const zod = require('zod');

const  { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try{
        const products = await prisma.gallery.findMany();

        return res.status(201).json({
            products
        })
    }catch(e){
        return res.status(500).json({
            message: "error getting the products"
        })
    }
})

router.get('/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);

    try{
        const product = await prisma.gallery.findFirst({
            where: {
                id: productId
            }
        })

        return res.status(201).json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "error getting the product"
        })
    }
})

module.exports = router