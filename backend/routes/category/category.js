const express = require('express')
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try{
        const categories = await prisma.category.findMany();

        res.json({
            categories
        })
    }catch(e){
        res.status(500).json({
            message: "server error"
        })
    }
})

router.get('/:id/products', async (req, res) => {
    try{
        const products = await prisma.product.findMany({
            where: {categoryId: parseInt(req.params.id)}
        })

        res.json({
            products
        })
    }catch(e){
        res.status(500).json({
            message: "Server error"
        })
    }
})

module.exports = router;