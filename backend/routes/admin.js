const express = require('express')
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const zod = require('zod')

const productBody = zod.object({
    name: zod.string(),
    description: zod.string(),
    price: zod.number().refine((val) => val % 1 !== 0, {
        message: "Price must be a float number",
    }),
    imageUrl: zod.string(),
    category: zod.string()
})

router.post('/product', async (req, res) => {
    const result = productBody.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs",
            error: result.error.errors
        })
    }

    const {name, description, price, imageUrl, category} = req.body;

    try{
        const existingCategory = await prisma.category.findUnique({
            where: { name: category }
        });

        let categoryId;
        if (existingCategory) {
            categoryId = existingCategory.id;
        } else {
            const newCategory = await prisma.category.create({
                data: { name: category }
            });
            categoryId = newCategory.id;
        }

        const product = await prisma.product.create({
            data: {
                name: name,
                description: description,
                price: price,
                imageUrl: imageUrl,
                category: {
                    connect: { id: categoryId }
                }
            }
        })

        return res.status(201).json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "error creating product",
            error: e.message
        })
    }
})

const productPutBody = zod.object({
    description: zod.string().optional(),
    price: zod.number().refine((val) => val % 1 !== 0, {
        message: "Price must be a float number",
    }).optional(),
    imageUrl: zod.string().optional()
})

router.put('/product/:id', async (req, res) => {
    const result = productPutBody.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const {description, price, imageUrl} = req.body;
    const productId = parseInt(req.params.id, 10);

    try{
        const product = await prisma.product.update({
            where : {
                id: productId
            },
            data : {
                description,
                price,
                imageUrl
            }
        })

        return res.status(200).json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "Error updating product"
        })
    }
})

router.delete('/product/:id', async (req, res) => {
    const productId = parseInt(req.params.id, 10);
    try{
        const product = await prisma.product.delete({
            where: {
                id: productId
            }
        })

        return res.json({
            product
        })
    }catch(e){
        return res.status(500).json({
            message: "Error deleting the product"
        })
    }
})

module.exports = router;
